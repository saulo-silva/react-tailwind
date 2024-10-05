import React, { createContext, useContext, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Circle } from "./circle";

const StepperContext = createContext({ active: 0, onStepClick: () => {} });

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

const Step = ({ label, description, step }) => {
  const { active, onStepClick } = useContext(StepperContext);
  const isActive = step === active;
  const isCompleted = step < active;
  const status = isActive ? 'current' : isCompleted ? 'completed' : 'awaiting';

  return (
    <div className="flex flex-col items-center">
      <Circle status={status} onClick={() => onStepClick(step)} />
      <div className="mt-2 text-center">
        <div className="text-sm">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};

const Completed = ({ children }) => {
  return <div className="text-center font-bold text-green-500">{children}</div>;
};

Stepper.displayName = 'Stepper';
Stepper.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.number.isRequired,
  onStepClick: PropTypes.func.isRequired,
};

Stepper.Step = Step;
Step.displayName = 'Stepper.Step';
Step.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  step: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Stepper.Completed = Completed;
Completed.displayName = 'Stepper.Completed';
Completed.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Stepper;
