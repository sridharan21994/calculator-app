import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import MortgageCalculator from './pages/Financial/MortgageCalculator';
import LoanCalculator from './pages/Financial/LoanCalculator';
import AutoLoanCalculator from './pages/Financial/AutoLoanCalculator';
import InterestCalculator from './pages/Financial/InterestCalculator';
import PaymentCalculator from './pages/Financial/PaymentCalculator';
import RetirementCalculator from './pages/Financial/RetirementCalculator';
import AmortizationCalculator from './pages/Financial/AmortizationCalculator';
import BMICalculator from './pages/Fitness/BMICalculator';
import CalorieCalculator from './pages/Fitness/CalorieCalculator';
import BodyFatCalculator from './pages/Fitness/BodyFatCalculator';
import BMRCalculator from './pages/Fitness/BMRCalculator';
import IdealWeightCalculator from './pages/Fitness/IdealWeightCalculator';
import PaceCalculator from './pages/Fitness/PaceCalculator';
import PregnancyCalculator from './pages/Fitness/PregnancyCalculator';
import ScientificCalculator from './pages/Math/ScientificCalculator';
import FractionCalculator from './pages/Math/FractionCalculator';
import PercentageCalculator from './pages/Math/PercentageCalculator';
import RandomNumberGenerator from './pages/Math/RandomNumberGenerator';
import TriangleCalculator from './pages/Math/TriangleCalculator';
import StandardDeviationCalculator from './pages/Math/StandardDeviationCalculator';
import AgeCalculator from './pages/Other/AgeCalculator';
import DateCalculator from './pages/Other/DateCalculator';
import TimeCalculator from './pages/Other/TimeCalculator';
import HoursCalculator from './pages/Other/HoursCalculator';
import GPACalculator from './pages/Other/GPACalculator';
import GradeCalculator from './pages/Other/GradeCalculator';
import ConcreteCalculator from './pages/Other/ConcreteCalculator';
import CalculatorPlaceholder from './components/Calculator/CalculatorPlaceholder';
import { categories } from './data/categories';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Specific Implementations */}
          <Route path="/financial/mortgage" element={<MortgageCalculator />} />
          <Route path="/financial/loan" element={<LoanCalculator />} />
          <Route path="/financial/auto-loan" element={<AutoLoanCalculator />} />
          <Route path="/financial/interest" element={<InterestCalculator />} />
          <Route path="/financial/payment" element={<PaymentCalculator />} />
          <Route path="/financial/retirement" element={<RetirementCalculator />} />
          <Route path="/financial/amortization" element={<AmortizationCalculator />} />
          <Route path="/fitness/bmi" element={<BMICalculator />} />
          <Route path="/fitness/calorie" element={<CalorieCalculator />} />
          <Route path="/fitness/body-fat" element={<BodyFatCalculator />} />
          <Route path="/fitness/bmr" element={<BMRCalculator />} />
          <Route path="/fitness/ideal-weight" element={<IdealWeightCalculator />} />
          <Route path="/fitness/pace" element={<PaceCalculator />} />
          <Route path="/fitness/pregnancy" element={<PregnancyCalculator />} />

          <Route path="/math/scientific" element={<ScientificCalculator />} />
          <Route path="/math/fraction" element={<FractionCalculator />} />
          <Route path="/math/percentage" element={<PercentageCalculator />} />
          <Route path="/math/random" element={<RandomNumberGenerator />} />
          <Route path="/math/triangle" element={<TriangleCalculator />} />
          <Route path="/math/standard-deviation" element={<StandardDeviationCalculator />} />

          <Route path="/other/age" element={<AgeCalculator />} />
          <Route path="/other/date" element={<DateCalculator />} />
          <Route path="/other/time" element={<TimeCalculator />} />
          <Route path="/other/hours" element={<HoursCalculator />} />
          <Route path="/other/gpa" element={<GPACalculator />} />
          <Route path="/other/grade" element={<GradeCalculator />} />
          <Route path="/other/concrete" element={<ConcreteCalculator />} />

          {/* Dynamic Routes for everything else */}


          {/* Fallback for category pages themselves if clicked */}
          {categories.map(cat => (
            <Route
              key={cat.path}
              path={cat.path}
              element={<Home />}
            />
          ))}

          <Route path="*" element={<CalculatorPlaceholder name="Page Not Found" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
