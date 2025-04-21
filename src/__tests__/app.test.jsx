import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../app';

// Mock dos componentes para simplificar os testes
vi.mock('../layouts/layout.jsx', () => ({
  default: ({ children }) => <div data-testid="layout">{children}</div>
}));

// Mock de todas as páginas para evitar renderização real
vi.mock('../pages/home.jsx', () => ({ default: () => <div>Mock Home</div> }));
vi.mock('../pages/church-form.jsx', () => ({ default: () => <div>Mock Church Form</div> }));
vi.mock('../pages/contact.jsx', () => ({ default: () => <div>Mock Contact</div> }));
vi.mock('../pages/product-selection.jsx', () => ({ default: () => <div>Mock Products</div> }));
vi.mock('../pages/cart/index.jsx', () => ({ default: () => <div>Mock Cart</div> }));
vi.mock('../pages/checkout.jsx', () => ({ default: () => <div>Mock Checkout</div> }));
vi.mock('../pages/order-success.jsx', () => ({ default: () => <div>Mock Order Success</div> }));

describe('App', () => {
  it('renderiza o componente Layout', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    // Verifica se o layout foi renderizado
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
}); 