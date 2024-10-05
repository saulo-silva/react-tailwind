import { useStepper } from "./useStepper";

function Step1() {
  const { onStepClick } = useStepper();

  return (
    <div className="border p-2">
      <h1>Step 1 content: Create an account</h1>
      <button type="button" className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => onStepClick(2)}>Não clica aqui</button>
    </div>
  );
}

export default Step1;
