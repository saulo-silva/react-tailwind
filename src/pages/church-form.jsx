// const Divisor = () => <div className="border-t border-black" />
const ChurchForm = () => {
  return (
    <div className="flex-1 p-1">
      <div className="border border-black p-4">
        <h1 className="mb-4 text-center text-lg font-bold underline">CONGREGAÇÃO CRISTÃ NO BRASIL</h1>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-semibold italic">Data:</span>
            <div className="flex gap-2">
              <div className="w-36 border-b border-black">
                <span className="ml-8">/</span>
                <span className="ml-8">/</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <span>Presidência da RJM:</span>
            <div className="grow border-b border-black"></div>
          </div>

          <div className="flex gap-2">
            <span>Irmãs auxiliares:</span>
            <div className="grow border-b border-black"></div>
          </div>

          <div className="flex gap-2">
            <span>Irmãos auxiliares:</span>
            <div className="grow border-b border-black"></div>
          </div>

          <div className="flex gap-2">
            <span>Hinos Tocados:</span>
            <div className="grow border-b border-black"></div>
          </div>

          {/*<Divisor />*/}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold italic">Recitativos das Irmãs:</h4>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span>Bebês:</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Crianças:</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Moças:</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Recitativo(s) parcial(is):</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Total das moças:</span>
                  <div className="grow border-b border-black"></div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold italic">Recitativos dos Irmãos:</h4>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span>Bebês:</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Crianças:</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Moças:</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Recitativo(s) parcial(is):</span>
                  <div className="grow border-b border-black"></div>
                </div>
                <div className="flex gap-2">
                  <span>Total dos moços:</span>
                  <div className="grow border-b border-black"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <span className="font-semibold italic">Total geral:</span>
            <div className="max-w-[200px] grow border-b border-black"></div>
          </div>

          {/*<Divisor />*/}
          <div className="flex gap-2">
            <span className="font-semibold italic">Testemunhos:</span>
            <div className="max-w-[200px] grow border-b border-black"></div>
          </div>

          {/*<Divisor />*/}
          <div>
            <h3 className="mb-2 font-semibold italic">Palavra:</h3>
            <div className="flex gap-2">
              <span>Livro:</span>
              <div className="grow border-b border-black"></div>
              <span>Capítulo:</span>
              <div className="w-16 border-b border-black"></div>
            </div>
          </div>

          <div className="flex gap-2">
            <span>Irmão que pregou:</span>
            <div className="grow border-b border-black"></div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold italic">Obs:</h3>
            <div className="h-4 w-full border-b border-black"></div>
            <div className="h-4 w-full border-b border-black"></div>
            <div className="h-4 w-full border-b border-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChurchForm;
