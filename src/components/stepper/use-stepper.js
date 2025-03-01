import { useContext } from "react";
import { StepperContext } from "./stepper.jsx";

export const useStepper = () => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }

  return context;
};
