package com.workouts.myworkouts.service.fit;

import com.garmin.fit.Decode;
import com.garmin.fit.ExerciseCategory;
import com.garmin.fit.FileIdMesgListener;
import com.garmin.fit.FitRuntimeException;
import com.garmin.fit.MesgBroadcaster;
import com.garmin.fit.SessionMesgListener;
import com.garmin.fit.SetMesg;
import com.garmin.fit.SetMesgListener;
import com.garmin.fit.SetType;
import com.workouts.myworkouts.model.dto.fit.FitExerciseDto;
import com.workouts.myworkouts.model.dto.fit.FitSetDto;
import com.workouts.myworkouts.model.dto.fit.FitWorkoutDto;
import com.workouts.myworkouts.model.entity.exercise.Exercise;
import com.workouts.myworkouts.repository.exercise.ExerciseRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FitImportServiceImpl implements FitImportService {

    // FIT encodes "no subtype" as an invalid uint16.
    private static final int INVALID_SUBTYPE = 0xFFFE;

    private static final String UNKNOWN = "UNKNOWN";

    private final ExerciseRepository exerciseRepository;

    @Override
    @Transactional(readOnly = true)
    public FitWorkoutDto parseFitFile(@NonNull MultipartFile file) {
        final List<SetMesg> setMessages = new ArrayList<>();
        final Date[] activityDate = new Date[1];

        final Decode decode = new Decode();
        final MesgBroadcaster broadcaster = new MesgBroadcaster(decode);
        broadcaster.addListener((SetMesgListener) setMessages::add);
        broadcaster.addListener((FileIdMesgListener) mesg -> {
            if (activityDate[0] == null && mesg.getTimeCreated() != null) {
                activityDate[0] = mesg.getTimeCreated().getDate();
            }
        });
        // Session start beats file creation time when present.
        broadcaster.addListener((SessionMesgListener) mesg -> {
            if (mesg.getStartTime() != null) {
                activityDate[0] = mesg.getStartTime().getDate();
            }
        });

        try (InputStream in = file.getInputStream()) {
            decode.read(in, broadcaster, broadcaster);
        } catch (FitRuntimeException | IOException e) {
            throw new IllegalArgumentException("Not a readable FIT file: " + e.getMessage(), e);
        }

        final List<Block> blocks = groupActiveSets(setMessages);
        log.info("Parsed FIT file '{}': {} set messages, {} exercise blocks",
                file.getOriginalFilename(), setMessages.size(), blocks.size());

        final List<Exercise> knownExercises = exerciseRepository.findAll();
        final List<FitExerciseDto> exercises = blocks.stream()
                .map(block -> new FitExerciseDto(block.name, suggestExercise(block.name, knownExercises), block.sets))
                .toList();

        return new FitWorkoutDto(toLocalDate(activityDate[0]), exercises);
    }

    private static final class Block {
        private final String key;
        private String name;
        private final List<FitSetDto> sets = new ArrayList<>();

        private Block(String key, String name) {
            this.key = key;
            this.name = name;
        }
    }

    /**
     * Active sets grouped into exercise blocks. Classified sets merge across the whole
     * session by category. UNCLASSIFIED sets are grouped by their weight — same weight
     * almost always means the same exercise, even when its sets are interleaved with
     * recognized ones (a heuristic, but it matches how strength sessions actually look).
     */
    private static List<Block> groupActiveSets(List<SetMesg> setMessages) {
        final List<Block> blocks = new ArrayList<>();

        for (SetMesg set : setMessages) {
            if (set.getSetType() == null || set.getSetType() != SetType.ACTIVE) {
                continue;
            }
            final String name = garminExerciseName(set);
            final double weight = set.getWeight() != null ? Math.round(set.getWeight() * 10) / 10.0 : 0;
            final String key = UNKNOWN.equals(name) ? UNKNOWN + "@" + weight : name;

            final Block target = blocks.stream()
                    .filter(block -> block.key.equals(key))
                    .findFirst()
                    .orElseGet(() -> {
                        final Block created = new Block(key, name);
                        blocks.add(created);
                        return created;
                    });

            target.sets.add(new FitSetDto(
                    set.getRepetitions() != null ? set.getRepetitions() : 0,
                    weight,
                    set.getDuration() != null ? Math.round(set.getDuration()) : 0));
        }

        numberUnknownBlocks(blocks);
        return blocks;
    }

    /** With several unclassified groups, label them "UNKNOWN 1..N" so they stay tellable apart. */
    private static void numberUnknownBlocks(List<Block> blocks) {
        final List<Block> unknowns = blocks.stream().filter(block -> UNKNOWN.equals(block.name)).toList();
        if (unknowns.size() > 1) {
            for (int i = 0; i < unknowns.size(); i++) {
                unknowns.get(i).name = UNKNOWN + " " + (i + 1);
            }
        }
    }

    private static String garminExerciseName(SetMesg set) {
        final Integer category = set.getNumCategory() > 0 ? set.getCategory(0) : null;
        final String categoryName = category != null ? ExerciseCategory.getStringFromValue(category) : null;
        if (categoryName == null || categoryName.isBlank()) {
            return UNKNOWN;
        }
        // Keep distinct variants apart (e.g. flat vs incline bench) via the subtype code.
        final Integer subtype = set.getNumCategorySubtype() > 0 ? set.getCategorySubtype(0) : null;
        return subtype != null && subtype < INVALID_SUBTYPE ? categoryName + " #" + subtype : categoryName;
    }

    /** Loose name match: "BENCH_PRESS #3" suggests the app exercise containing "bench press". */
    private static Long suggestExercise(String garminName, List<Exercise> exercises) {
        final String normalized = garminName.toLowerCase().replaceAll("#\\d+", "").replace('_', ' ').trim();
        return exercises.stream()
                .filter(exercise -> {
                    final String candidate = exercise.getName().toLowerCase().trim();
                    return candidate.contains(normalized) || normalized.contains(candidate);
                })
                .map(Exercise::getId)
                .findFirst()
                .orElse(null);
    }

    private static LocalDate toLocalDate(Date date) {
        return date != null
                ? date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
                : LocalDate.now();
    }
}
