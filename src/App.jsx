import { useState } from "react";
import { cn } from "./utils";

import { Stepper } from './components/stepper';
import Step1 from "./components/stepper/step1.jsx";

function StepperExample() {
  const [active, setActive] = useState(0);
  const qtdSteps = 4;
  const nextStep = () => setActive((current) => (current < qtdSteps ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const isFirstStep = active === 0;
  const isLastStep = active === qtdSteps;
  const isBeforeLastStep = active === (qtdSteps - 1);

  return (
    <div className="w-[600px]">
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
          <div className="border p-2">
            Completed, click back button to get to previous step
          </div>
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
          Voltar
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
          {isBeforeLastStep || isLastStep ? "Enviar" : "Continuar"}
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
