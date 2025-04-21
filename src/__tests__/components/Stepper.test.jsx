import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Stepper from '../../components/stepper/stepper';

// Mock deve ser declarado ANTES de qualquer código, pois é hoisted
vi.mock('../../components/circle/index.js', () => ({
  Circle: (props) => (
    <button 
      data-testid={`circle-${props.status}`} 
      onClick={props.onClick}
    >
      {props.status}
    </button>
  )
}));

describe('Stepper', () => {
  it('renderiza o stepper com os passos corretos', () => {
    render(
      <Stepper active={0} onStepClick={() => {}}>
        <Stepper.Step label="Passo 1">
          <div>Conteúdo do Passo 1</div>
        </Stepper.Step>
        <Stepper.Step label="Passo 2">
          <div>Conteúdo do Passo 2</div>
        </Stepper.Step>
        <Stepper.Step label="Passo 3">
          <div>Conteúdo do Passo 3</div>
        </Stepper.Step>
        <Stepper.Completed>
          <div>Finalizado!</div>
        </Stepper.Completed>
      </Stepper>
    );

    // Verifica se os labels dos passos estão presentes
    expect(screen.getByText('Passo 1')).toBeInTheDocument();
    expect(screen.getByText('Passo 2')).toBeInTheDocument();
    expect(screen.getByText('Passo 3')).toBeInTheDocument();

    // Verifica se o conteúdo do passo ativo está visível
    expect(screen.getByText('Conteúdo do Passo 1')).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo do Passo 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Finalizado!')).not.toBeInTheDocument();
  });

  it('mostra o conteúdo do passo correspondente ao passo ativo', () => {
    const { rerender } = render(
      <Stepper active={0} onStepClick={() => {}}>
        <Stepper.Step label="Passo 1">
          <div>Conteúdo do Passo 1</div>
        </Stepper.Step>
        <Stepper.Step label="Passo 2">
          <div>Conteúdo do Passo 2</div>
        </Stepper.Step>
        <Stepper.Completed>
          <div>Finalizado!</div>
        </Stepper.Completed>
      </Stepper>
    );

    expect(screen.getByText('Conteúdo do Passo 1')).toBeInTheDocument();

    // Muda para o passo 2
    rerender(
      <Stepper active={1} onStepClick={() => {}}>
        <Stepper.Step label="Passo 1">
          <div>Conteúdo do Passo 1</div>
        </Stepper.Step>
        <Stepper.Step label="Passo 2">
          <div>Conteúdo do Passo 2</div>
        </Stepper.Step>
        <Stepper.Completed>
          <div>Finalizado!</div>
        </Stepper.Completed>
      </Stepper>
    );

    expect(screen.queryByText('Conteúdo do Passo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Conteúdo do Passo 2')).toBeInTheDocument();
  });

  it('mostra o conteúdo de Completed quando todos os passos foram concluídos', () => {
    render(
      <Stepper active={2} onStepClick={() => {}}>
        <Stepper.Step label="Passo 1">
          <div>Conteúdo do Passo 1</div>
        </Stepper.Step>
        <Stepper.Step label="Passo 2">
          <div>Conteúdo do Passo 2</div>
        </Stepper.Step>
        <Stepper.Completed>
          <div>Finalizado!</div>
        </Stepper.Completed>
      </Stepper>
    );

    expect(screen.getByText('Finalizado!')).toBeInTheDocument();
  });

  it('chama onStepClick quando um círculo é clicado', async () => {
    const handleStepClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Stepper active={0} onStepClick={handleStepClick}>
        <Stepper.Step label="Passo 1">
          <div>Conteúdo do Passo 1</div>
        </Stepper.Step>
        <Stepper.Step label="Passo 2">
          <div>Conteúdo do Passo 2</div>
        </Stepper.Step>
      </Stepper>
    );

    // Clica no círculo do primeiro passo (que tem status 'current')
    await user.click(screen.getByTestId('circle-current'));
    expect(handleStepClick).toHaveBeenCalledWith(0);
  });
}); 