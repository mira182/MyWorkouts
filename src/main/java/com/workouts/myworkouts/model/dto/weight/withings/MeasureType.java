package com.workouts.myworkouts.model.dto.weight.withings;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MeasureType {
    WEIGHT(1), // kg
    FAT_FREE_MASS(5), // kg
    FAT_RATIO(6), // %
    FAT_MASS_WEIGHT(8), // kg
    MUSCLE_MASS(76), // kg
    HYDRATION(77), // kg
    BONE_MASS(88); // kg

    private int code;

    MeasureType(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    @JsonValue
    public int toValue() {
        return getCode();
    }

    public static MeasureType forCode(int code) {
        for (MeasureType element : values()) {
            if (element.code == code) {
                return element;
            }
        }
        return null;
    }

    @JsonCreator
    public static MeasureType forValue(String v) {
        return MeasureType.forCode(Integer.parseInt(v));
    }
}
