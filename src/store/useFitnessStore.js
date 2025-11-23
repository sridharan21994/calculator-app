import { create } from 'zustand';

export const useFitnessStore = create((set) => ({
    age: 25,
    gender: 'male', // 'male' or 'female'
    height: 175, // cm
    weight: 70, // kg
    activityLevel: 'sedentary', // sedentary, light, moderate, active, very_active
    unit: 'metric', // 'metric' or 'imperial'

    setAge: (age) => set({ age }),
    setGender: (gender) => set({ gender }),
    setHeight: (height) => set({ height }),
    setWeight: (weight) => set({ weight }),
    setActivityLevel: (activityLevel) => set({ activityLevel }),
    setUnit: (unit) => set({ unit }),
}));
