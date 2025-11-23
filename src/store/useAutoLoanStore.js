import { create } from 'zustand';

export const useAutoLoanStore = create((set) => ({
    autoPrice: 25000,
    loanTerm: 60, // months
    interestRate: 4.5, // percentage
    downPayment: 0,
    tradeInValue: 0,
    salesTax: 0, // percentage
    fees: 0,

    setAutoPrice: (autoPrice) => set({ autoPrice }),
    setLoanTerm: (loanTerm) => set({ loanTerm }),
    setInterestRate: (interestRate) => set({ interestRate }),
    setDownPayment: (downPayment) => set({ downPayment }),
    setTradeInValue: (tradeInValue) => set({ tradeInValue }),
    setSalesTax: (salesTax) => set({ salesTax }),
    setFees: (fees) => set({ fees }),
}));
