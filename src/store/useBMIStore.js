import { create } from 'zustand';

export const useBMIStore = create((set) => ({
    unit: 'metric', // metric or us
    age: 25,
    gender: 'male',
    heightCm: 180,
    weightKg: 75,
    heightFt: 5,
    heightIn: 10,
    weightLb: 160,

    setUnit: (val) => set({ unit: val }),
    setAge: (val) => set({ age: val }),
    setGender: (val) => set({ gender: val }),
    setHeightCm: (val) => set({ heightCm: val }),
    setWeightKg: (val) => set({ weightKg: val }),
    setHeightFt: (val) => set({ heightFt: val }),
    setHeightIn: (val) => set({ heightIn: val }),
    setWeightLb: (val) => set({ weightLb: val }),
}));
