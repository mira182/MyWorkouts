package com.workouts.myworkouts.controller.chart;

import com.workouts.myworkouts.model.enums.BreakdownChartGroup;
import com.workouts.myworkouts.model.enums.BreakdownChartType;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.workouts.myworkouts.config.Constants.API_BASE_URL;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = API_BASE_URL + "/charts")
public class ChartController {

    @GetMapping("/breakdownChartTypes")
    public List<BreakdownChartType> getAllBreakdownChartTypes() {
        return List.of(BreakdownChartType.values());
    }

    @GetMapping("/breakdownChartGroups")
    public List<BreakdownChartGroup> getAllBreakdownChartGroups() {
        return List.of(BreakdownChartGroup.values());
    }
}
