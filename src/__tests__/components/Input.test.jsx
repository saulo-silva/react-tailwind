import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../../components/ui/Input';

describe('Input', () => {
  it('renderiza o input corretamente', () => {
    render(<Input placeholder="Digite algo" />);
    expect(screen.getByPlaceholderText('Digite algo')).toBeInTheDocument();
  });

  it('renderiza o label quando fornecido', () => {
    render(<Input id="name" label="Nome" />);
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });

  it('exibe mensagem de erro quando fornecida', () => {
    render(<Input error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('aplica classes de erro quando há erro', () => {
    render(<Input error="Campo obrigatório" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('permite entrada de texto', async () => {
    const user = userEvent.setup();
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Teste de entrada');
    
    expect(input).toHaveValue('Teste de entrada');
  });

  it('aplica tipo correto ao input', () => {
    const { container } = render(<Input type="password" />);
    // Selecionar diretamente o input pelo container pois senha não tem role textbox
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });
}); 