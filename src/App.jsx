import { useState } from "react";
import { cn } from "./utils";

import { Stepper } from './components/stepper';

function StepperExample() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const isFirstStep = active === 0;
  const isLastStep = active === 3;
  const isBeforeLastStep = active === 2;

  return (
    <div className="w-[600px]">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      <div className="mt-4 flex items-center justify-center gap-4 border p-2">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className={
          cn(
            "rounded px-4 py-2 text-white",
            isFirstStep ? "bg-gray-300" : "bg-blue-500"
          )}
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={isLastStep}
          className={
          cn(
            "rounded px-4 py-2 text-white",
            isBeforeLastStep ? "bg-orange-400" : isLastStep ? "bg-gray-300" : "bg-blue-500"
          )}
        >
          {isBeforeLastStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4 bg-gray-50'>
      <StepperExample />
    </div>
  )
}

export default App
