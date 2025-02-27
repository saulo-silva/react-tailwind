const ChurchForm = () => {
  return (
    <div className="mx-auto max-w-[700px] rounded-lg bg-white p-6 shadow-lg">
      <div className="border border-black p-4">
        <h1 className="mb-4 text-center text-lg font-bold underline">CONGREGAÇÃO CRISTÃ NO BRASIL</h1>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span>Data:</span>
            <div className="flex gap-2">
              <div className="w-8 border-b border-gray-400"></div>
              <span>/</span>
              <div className="w-8 border-b border-gray-400"></div>
              <span>/</span>
              <div className="w-16 border-b border-gray-400"></div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <span>Irmão que atendeu:</span>
            <div className="grow border-b border-gray-400"></div>
          </div>
          
          <div className="flex gap-2">
            <span>Irmãs auxiliares:</span>
            <div className="grow border-b border-gray-400"></div>
          </div>
          
          <div className="flex gap-2">
            <span>Irmãos auxiliares:</span>
            <div className="grow border-b border-gray-400"></div>
          </div>
          
          <div className="flex gap-2">
            <span>Hinos:</span>
            <div className="grow border-b border-gray-400"></div>
          </div>

          <div className="mb-2 border-t border-gray-200"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-bold">Recitativos:</h3>
              <h4 className="italic">Moças:</h4>
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span>Conjunto:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Primeira continuação:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Segunda continuação:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Parcial:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Total das moças:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="mt-6 italic">Moços:</h4>
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span>Conjunto:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Primeira continuação:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Segunda continuação:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Parcial:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
                <div className="flex gap-2">
                  <span>Total dos moços:</span>
                  <div className="grow border-b border-gray-400"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <span>Total geral:</span>
            <div className="max-w-[200px] grow border-b border-gray-400"></div>
          </div>

          <div className="mb-2 border-t border-gray-200"></div>
          <div className="flex gap-2">
            <span>Testemunhos:</span>
            <div className="max-w-[200px] grow border-b border-gray-400"></div>
          </div>

          <div className="mb-2 border-t border-gray-200"></div>
          <div>
            <h3 className="font-bold">Palavra:</h3>
            <div className="flex gap-2">
              <span>Livro:</span>
              <div className="grow border-b border-gray-400"></div>
              <span>Capítulo:</span>
              <div className="w-16 border-b border-gray-400"></div>
            </div>
          </div>

          <div className="flex gap-2">
            <span>Irmão que pregou:</span>
            <div className="grow border-b border-gray-400"></div>
          </div>

          <div className="space-y-4">
            <span className="font-bold">OBS:</span>
            <div className="h-4 w-full border-b border-gray-400"></div>
            <div className="h-4 w-full border-b border-gray-400"></div>
            <div className="h-4 w-full border-b border-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChurchForm;