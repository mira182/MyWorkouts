package com.workouts.myworkouts.service;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class WeightUtils {

    public static double calculatePercentage(double weight, double value) {
        return BigDecimal.valueOf((value / weight) * 100).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    public static double calculateMass(double weight, double percentageValue) {
        return BigDecimal.valueOf((weight / 100) * percentageValue).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}
