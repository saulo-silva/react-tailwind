import { StepperExample } from "./StepperExample.jsx";


export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex w-full items-center justify-center bg-blue-700 p-4">
        {/* Logo SVG */}
        <svg
          className="size-10"
          viewBox="0 0 100 100"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill="white" />
          <text x="50%" y="55%" textAnchor="middle" fill="blue" fontSize="24" fontWeight="bold" dy=".3em">MP</text>
        </svg>
      </header>

      {/* Main */}
      <main role="main"
            className="mt-0 flex  flex-col items-center gap-4 bg-gray-100 p-4 md:flex-1 md:justify-center">
        <StepperExample />
      </main>

      {/* Footer (Desktop) */}
      <footer className="hidden w-full bg-blue-700 p-4 text-white md:block">
        <p className="text-center">© 2024 Meu Projeto. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}




// export default App
