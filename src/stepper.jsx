import React, { createContext, useContext, Children, cloneElement } from 'react';
// import { Circle } from "./circle/index.js";

const StepperContext = createContext();

export const Stepper = ({ children, active, onStepClick }) => {
  const steps = Children.toArray(children).filter(child => child.type !== Stepper.Completed);
  const completedStep = Children.toArray(children).find(child => child.type === Stepper.Completed);

  return (
    <StepperContext.Provider value={{ active, onStepClick }}>
      <div className="flex flex-col">
        <div className="mb-4 flex">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {cloneElement(step, { step: index })}
              {index < steps.length - 1 && (
                <div className={`mx-2 my-auto h-px flex-1 ${index < active ? 'bg-blue-500' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4">
          {active < steps.length ? steps[active].props.children : completedStep}
        </div>
      </div>
    </StepperContext.Provider>
  );
};

Stepper.Step = ({ label, description, step, children }) => {
  const { active, onStepClick } = useContext(StepperContext);
  const isActive = step === active;
  const isCompleted = step < active;

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onStepClick(step)}
        className={`flex size-10 items-center justify-center rounded-full font-bold text-white
          ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        {isCompleted ? '✓' : step + 1}
      </button>
      {/*<Circle />*/}
      <div className="mt-2 text-center">
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};

Stepper.Completed = ({ children }) => {
  return <div className="text-center font-bold text-green-500">{children}</div>;
};

export default Stepper;
