import { useContext } from "react";
import { StepperContext } from "./stepper.jsx";

export const useStepper = () => {
  return  useContext(StepperContext);
}
