import { useState } from "react";
import { cn } from "./utils";

import { Stepper } from './components/stepper';
import Step1 from "./components/stepper/step1.jsx";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const useStepper = (qtdSteps) => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => clamp(current + 1, 0, qtdSteps));
  const prevStep = () => setActive((current) => clamp(current - 1, 0, qtdSteps));
  const isFirstStep = active === 0;
  const isLastStep = active === qtdSteps;
  const isBeforeLastStep = active === qtdSteps - 1;

  return {
    active,
    setActive,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    isBeforeLastStep,
  };
};

export function StepperExample() {
  const qtdSteps = 4;
  const { active, setActive, nextStep, prevStep, isFirstStep, isLastStep, isBeforeLastStep } = useStepper(qtdSteps);

  return (
    <div className="w-full max-w-2xl rounded-md border p-2">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step>
          <Step1 />
        </Stepper.Step>
        <Stepper.Step>
          <div className="border p-2">
            Step 2 content: Verify email
          </div>

        </Stepper.Step>
        <Stepper.Step>
          <div className="border p-2">
            Step 3 content: Get full access
          </div>
        </Stepper.Step>
        <Stepper.Step>
          <div className="border p-2">
            Step 4 content: Get full access
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <div className="border p-2 text-center font-bold text-green-800">
            Completed, click back button to get to previous step
          </div>
        </Stepper.Completed>
      </Stepper>
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-between border-t border-gray-300 bg-white p-4 md:relative md:border-none md:bg-transparent">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className={
            cn(
              "rounded px-4 py-2 text-white",
              isFirstStep ? "bg-gray-600" : "bg-blue-700"
            )}
        >
          Voltar
        </button>
        <button
          onClick={nextStep}
          disabled={isLastStep}
          className={cn(
            "rounded px-4 py-2 text-white",
            {
              "bg-orange-800": isBeforeLastStep,
              "bg-gray-600": isLastStep,
              "bg-blue-700": !isBeforeLastStep && !isLastStep,
            }
          )}
        >
          {isBeforeLastStep || isLastStep ? "Enviar" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
