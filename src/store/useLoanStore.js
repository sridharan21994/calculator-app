import { create } from 'zustand';

export const useLoanStore = create((set) => ({
    loanAmount: 10000,
    loanTerm: 5, // years
    interestRate: 5.0, // percentage

    setLoanAmount: (loanAmount) => set({ loanAmount }),
    setLoanTerm: (loanTerm) => set({ loanTerm }),
    setInterestRate: (interestRate) => set({ interestRate }),
}));
