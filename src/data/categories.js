import {
  DollarOutlined,
  HeartOutlined,
  CalculatorOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

export const categories = [
  {
    title: "Financial Calculators",
    icon: DollarOutlined,
    path: "/financial",
    links: [
      { name: "Mortgage Calculator", path: "/financial/mortgage" },
      { name: "Loan Calculator", path: "/financial/loan" },
      { name: "Auto Loan Calculator", path: "/financial/auto-loan" },
      { name: "Interest Calculator", path: "/financial/interest" },
      { name: "Payment Calculator", path: "/financial/payment" },
      { name: "Retirement Calculator", path: "/financial/retirement" },
      { name: "Amortization Calculator", path: "/financial/amortization" },
    ]
  },
  {
    title: "Fitness & Health Calculators",
    icon: HeartOutlined,
    path: "/fitness",
    links: [
      { name: "BMI Calculator", path: "/fitness/bmi" },
      { name: "Calorie Calculator", path: "/fitness/calorie" },
      { name: "Body Fat Calculator", path: "/fitness/body-fat" },
      { name: "BMR Calculator", path: "/fitness/bmr" },
      { name: "Ideal Weight Calculator", path: "/fitness/ideal-weight" },
      { name: "Pace Calculator", path: "/fitness/pace" },
      { name: "Pregnancy Calculator", path: "/fitness/pregnancy" },
    ]
  },
  {
    title: "Math Calculators",
    icon: CalculatorOutlined,
    path: "/math",
    links: [
      { name: "Scientific Calculator", path: "/math/scientific" },
      { name: "Fraction Calculator", path: "/math/fraction" },
      { name: "Percentage Calculator", path: "/math/percentage" },
      { name: "Random Number Generator", path: "/math/random" },
      { name: "Triangle Calculator", path: "/math/triangle" },
      { name: "Standard Deviation Calculator", path: "/math/standard-deviation" },
    ]
  },
  {
    title: "Other Calculators",
    icon: AppstoreOutlined,
    path: "/other",
    links: [
      { name: "Age Calculator", path: "/other/age" },
      { name: "Date Calculator", path: "/other/date" },
      { name: "Time Calculator", path: "/other/time" },
      { name: "Hours Calculator", path: "/other/hours" },
      { name: "GPA Calculator", path: "/other/gpa" },
      { name: "Grade Calculator", path: "/other/grade" },
      { name: "Concrete Calculator", path: "/other/concrete" },
    ]
  }
];
