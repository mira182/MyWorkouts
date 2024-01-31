package com.workouts.myworkouts.model.dto.weight.withings;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum WithingsMeasureType {
    WEIGHT(1), // kg
    FAT_FREE_MASS(5), // kg
    FAT_RATIO(6), // %
    FAT_MASS_WEIGHT(8), // kg
    MUSCLE_MASS(76), // kg
    HYDRATION(77), // kg
    BONE_MASS(88); // kg

    private int code;

    WithingsMeasureType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    @JsonValue
    public int toValue() {
        return getCode();
    }

    public static WithingsMeasureType forCode(int code) {
        for (WithingsMeasureType element : values()) {
            if (element.code == code) {
                return element;
            }
        }
        return null;
    }

    @JsonCreator
    public static WithingsMeasureType forValue(String v) {
        return WithingsMeasureType.forCode(Integer.parseInt(v));
    }
}
