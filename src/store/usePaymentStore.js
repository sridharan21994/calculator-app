import { create } from 'zustand';

export const usePaymentStore = create((set) => ({
    loanAmount: 10000,
    loanTerm: 12, // months
    interestRate: 5.0, // percentage

    setLoanAmount: (loanAmount) => set({ loanAmount }),
    setLoanTerm: (loanTerm) => set({ loanTerm }),
    setInterestRate: (interestRate) => set({ interestRate }),
}));
