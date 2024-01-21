package com.workouts.myworkouts.service.weight.withings;

import com.workouts.myworkouts.model.dto.weight.withings.MeasureBodyDto;
import com.workouts.myworkouts.model.dto.weight.withings.WithingsMeasurementDto;
import com.workouts.myworkouts.model.mapper.WithingsMeasurementsMapper;
import com.workouts.myworkouts.repository.withings.WithingsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        measureBodyDto.getMeasuregrps().stream()
                .filter(measureGroupDto -> measureGroupDto.getAttrib() == 0)
                .forEach(measureGroupDto ->
                        withingsRepository.save(withingsMeasurementsMapper.dtoToEntity(measureGroupDto, timeZone)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<WithingsMeasurementDto> getMeasurements() {
        return withingsRepository.findAll().stream()
                .map(withingsMeasurementsMapper::entityToDto)
                .sorted(Comparator.comparing(WithingsMeasurementDto::getDate))
                .collect(Collectors.toList());
    }
}
