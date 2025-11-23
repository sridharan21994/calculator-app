import { create } from 'zustand';

export const useRetirementStore = create((set) => ({
    currentAge: 30,
    retirementAge: 65,
    lifeExpectancy: 85,
    currentSavings: 50000,
    annualContribution: 6000,
    preRetirementReturn: 7.0, // %
    postRetirementReturn: 4.0, // %
    inflationRate: 3.0, // %

    setCurrentAge: (currentAge) => set({ currentAge }),
    setRetirementAge: (retirementAge) => set({ retirementAge }),
    setLifeExpectancy: (lifeExpectancy) => set({ lifeExpectancy }),
    setCurrentSavings: (currentSavings) => set({ currentSavings }),
    setAnnualContribution: (annualContribution) => set({ annualContribution }),
    setPreRetirementReturn: (preRetirementReturn) => set({ preRetirementReturn }),
    setPostRetirementReturn: (postRetirementReturn) => set({ postRetirementReturn }),
    setInflationRate: (inflationRate) => set({ inflationRate }),
}));
