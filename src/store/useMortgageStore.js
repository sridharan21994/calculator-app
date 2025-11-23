import { create } from 'zustand';

export const useMortgageStore = create((set) => ({
    homePrice: 300000,
    downPayment: 60000,
    loanTerm: 30,
    interestRate: 6.5,
    propertyTax: 1.2, // percentage
    homeInsurance: 1500, // annual
    hoa: 0, // monthly

    setHomePrice: (val) => set({ homePrice: val }),
    setDownPayment: (val) => set({ downPayment: val }),
    setLoanTerm: (val) => set({ loanTerm: val }),
    setInterestRate: (val) => set({ interestRate: val }),
    setPropertyTax: (val) => set({ propertyTax: val }),
    setHomeInsurance: (val) => set({ homeInsurance: val }),
    setHoa: (val) => set({ hoa: val }),
}));
