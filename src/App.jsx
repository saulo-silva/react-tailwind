import { StepperExample } from "./StepperExample.jsx";
import { FocusPage } from "./FocusPage.jsx";
import ChurchForm from "./components/ChurchForm.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <header className="flex w-full items-center justify-center bg-blue-700 p-4">
        <svg
          className="size-10"
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill="white" />
          <text x="50%" y="55%" textAnchor="middle" fill="blue" fontSize="24" fontWeight="bold" dy=".3em">MP</text>
        </svg>
      </header> */}

      {/* <main role="main" className="flex w-full flex-1 flex-col items-center gap-4 bg-gray-50 p-4"> */}
      <main role="main" className="p-4">
        {/*<StepperExample />*/}
        {/* <FocusPage /> */}
        <ChurchForm />
      </main>

      {/* <footer className="hidden w-full bg-blue-700 p-4 text-white md:block">
        <p className="text-center">© 2024 Meu Projeto. Todos os direitos reservados.</p>
      </footer> */}
    </div>
  );
}

// export default App
