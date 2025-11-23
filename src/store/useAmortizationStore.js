import { create } from 'zustand';

export const useAmortizationStore = create((set) => ({
    loanAmount: 200000,
    loanTerm: 30, // years
    interestRate: 4.5, // percentage

    setLoanAmount: (loanAmount) => set({ loanAmount }),
    setLoanTerm: (loanTerm) => set({ loanTerm }),
    setInterestRate: (interestRate) => set({ interestRate }),
}));
