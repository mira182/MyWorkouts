package com.workouts.myworkouts.service.weight.tanita;

import com.workouts.myworkouts.model.dto.weight.tanita.GenericResponseDto;
import com.workouts.myworkouts.model.dto.weight.tanita.TanitaMeasurementDto;
import com.workouts.myworkouts.model.entity.weight.TanitaLastUpdate;
import com.workouts.myworkouts.model.entity.weight.TanitaMeasurement;
import com.workouts.myworkouts.model.mapper.TanitaMapper;
import com.workouts.myworkouts.repository.weight.TanitaLastUpdateRepository;
import com.workouts.myworkouts.repository.weight.TanitaRepository;
import com.workouts.myworkouts.service.gmail.GmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import static com.workouts.myworkouts.service.WeightUtils.calculateMass;
import static com.workouts.myworkouts.service.WeightUtils.calculatePercentage;


@Slf4j
@RequiredArgsConstructor
@Service
public class TanitaServiceImpl implements TanitaService {

    private final GmailService gmailService;

    private final TanitaLastUpdateRepository tanitaLastUpdateRepository;

    private final TanitaRepository tanitaRepository;

    private final TanitaMapper tanitaMapper;

    @Override
    @Transactional
    public GenericResponseDto saveWeightReport() throws IOException, GeneralSecurityException {
        final byte[] csvFileBytes = gmailService.getAttachmentFromMailByQuery();

        if (csvFileBytes == null || csvFileBytes.length < 1)
            return GenericResponseDto.builder()
                .status(true)
                .message("No emails found.")
                .build();

        tanitaRepository.deleteAll();

        CSVParser csvParser = CSVFormat.DEFAULT
                .withFirstRecordAsHeader()
                .parse(new InputStreamReader(new ByteArrayInputStream(csvFileBytes)));

        for (CSVRecord csvRecord : csvParser) {
            String dateString = csvRecord.get("Date");
            String weight = csvRecord.get("Weight (kg)");
            String bmi = csvRecord.get("BMI");
            String bodyFat = csvRecord.get("Body Fat (%)");
            String viscFat = csvRecord.get("Visc Fat");
            String muscleMass = csvRecord.get("Muscle Mass (kg)");
            String muscleQuality = csvRecord.get("Muscle Quality");
            String boneMass = csvRecord.get("Bone Mass (kg)");
            String bmr = csvRecord.get("BMR (kcal)");
            String metabAge = csvRecord.get("Metab Age");
            String bodyWatter = csvRecord.get("Body Water (%)");
            double bodyWatterMass = calculateMass(Double.parseDouble(weight), Double.parseDouble(bodyWatter));
            double bodyFatMass = calculateMass(Double.parseDouble(weight),  Double.parseDouble(bodyFat));
            double muscleMassRatio = calculatePercentage(Double.parseDouble(weight),  Double.parseDouble(muscleMass));
            String phyRating = csvRecord.get("Physique Rating");

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime date = LocalDateTime.parse(dateString, formatter);

            tanitaRepository.save(TanitaMeasurement.builder()
                    .boneMass(Double.parseDouble(boneMass))
                    .muscleMass(Double.parseDouble(muscleMass))
                    .muscleMassRatio(muscleMassRatio)
                    .bmi(Double.parseDouble(bmi))
                    .bmr(Double.parseDouble(bmr))
                    .bodyFat(Double.parseDouble(bodyFat))
                    .bodyFatMass(bodyFatMass)
                    .bodyWatter(Double.parseDouble(bodyWatter))
                    .bodyWatterMass(bodyWatterMass)
                    .metabolicAge(Double.parseDouble(metabAge))
                    .muscleQuality(Double.parseDouble(muscleQuality))
                    .physiqueRating(Double.parseDouble(phyRating))
                    .visceralFat(Double.parseDouble(viscFat))
                    .weight(Double.parseDouble(weight))
                    .date(date)
                    .build());
        }

        tanitaLastUpdateRepository.save(TanitaLastUpdate.builder()
                .updated(LocalDateTime.now())
                .build());

        return GenericResponseDto.builder()
                .status(true)
                .build();
    }

    @Override
    public List<TanitaMeasurementDto> getAllMeasurements() {
        final List<TanitaMeasurement> report = tanitaRepository.findAll();
        return report.stream().map(tanitaMapper::entityToDto).collect(Collectors.toList());
    }
}
