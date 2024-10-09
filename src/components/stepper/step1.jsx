import { useStepper } from "./useStepper";

function Step1() {
  const { onStepClick } = useStepper();

  return (
    <div className="border p-2">
      <div className="divide-y divide-dashed">
        <h1 className="p-2 font-bold">Step 1 content: Create an account</h1>
        <h1 className="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor</h1>
        <h1 className="p-2 text-red-600">lorem ipsum dolor sit amet. Donec auctor, nunc nec</h1>
        <h1 className="p-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
      </div>

      <button type="button" className="rounded bg-blue-700 px-4 py-2 text-white" onClick={() => onStepClick(1)}>Não
        Clica aqui
      </button>
    </div>
  );
}

export default Step1;
