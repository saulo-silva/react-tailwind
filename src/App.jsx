import Divisor from './divisor.jsx'
import { Circle } from './circle/index.js'
// import StepperExample from "./stepper.jsx";

import Stepper from './Stepper';
import { useState } from "react";

function StepperExample() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

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
          disabled={active === 0}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={active === 3}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4 bg-gray-50'>
      <div className='w-full max-w-[90%] sm:w-1/6'>
        <div className='flex w-full flex-row'>
          <Circle/>
          <Divisor/>
          <Circle/>
          <Divisor/>
          <Circle/>
        </div>
      </div>
      <StepperExample/>
      <div>
        conteúdo aqui
      </div>
    </div>
  )
}

export default App
