import { create } from 'zustand';

export const useInterestStore = create((set) => ({
    principal: 10000,
    rate: 5.0, // annual rate in percentage
    time: 5, // years
    compoundingFrequency: 'Annually', // Annually, Semiannually, Quarterly, Monthly, Daily
    contribution: 0, // monthly contribution

    setPrincipal: (principal) => set({ principal }),
    setRate: (rate) => set({ rate }),
    setTime: (time) => set({ time }),
    setCompoundingFrequency: (compoundingFrequency) => set({ compoundingFrequency }),
    setContribution: (contribution) => set({ contribution }),
}));
