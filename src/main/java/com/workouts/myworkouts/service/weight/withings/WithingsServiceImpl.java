package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.exceptions.NotFoundException;
import com.workouts.myworkouts.model.dto.weight.withings.MeasureBodyDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasurementsDto;
import com.workouts.myworkouts.model.mapper.WithingsMeasurementsMapper;
import com.workouts.myworkouts.repository.weight.withings.WithingsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WithingsServiceImpl implements WithingsService {

    private final WithingsRepository withingsRepository;

    private final WithingsMeasurementsMapper withingsMeasurementsMapper;

    @Override
    @Transactional
    public void saveMeasurements(MeasureBodyDto measureBodyDto) {
        withingsRepository.deleteAll();

        TimeZone timeZone = TimeZone.getTimeZone(measureBodyDto.getTimezone());

        measureBodyDto.getMeasureGroups().stream()
                .filter(measureGroupDto -> measureGroupDto.getAttrib() == 0)
                .forEach(measureGroupDto ->
                        withingsRepository.save(withingsMeasurementsMapper.dtoToEntity(measureGroupDto, timeZone)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<WithingsMeasurementsDto> getMeasurements() {
        return withingsRepository.findAll().stream()
                .map(withingsMeasurementsMapper::entityToDto)
                .sorted(Comparator.comparing(WithingsMeasurementsDto::getDate))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public WithingsMeasurementsDto getMeasurementByDate(LocalDate date) {
        return withingsRepository.findAllByDate(date).stream()
                .map(withingsMeasurementsMapper::entityToDto)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Couldn't find measurement by date: %s".formatted(date)));
    }
}
