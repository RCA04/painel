import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../Header';
import { CurrentUserProvider } from '../../context/currentUserContext';

function renderHeader() {
  return render(
    <CurrentUserProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </CurrentUserProvider>
  );
}

describe('Header', () => {
  it('deve exibir o botão "Logar" quando não há usuário logado', () => {
    renderHeader();
    expect(screen.getByText('Logar')).toBeInTheDocument();
  });
});

