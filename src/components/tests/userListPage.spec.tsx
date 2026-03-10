import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { UserListPage } from '../../pages/UserListPage';
import { usersApi } from '../../api/users';

jest.mock('../../api/users');

const mockedUsersApi = usersApi as jest.Mocked<typeof usersApi>;

function renderUserList() {
  return render(
    <MemoryRouter>
      <UserListPage />
    </MemoryRouter>
  );
}

describe('UserListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar a listagem de usuários', async () => {
    mockedUsersApi.getAll.mockResolvedValueOnce([
      { id: '1', name: 'João', email: 'joao@example.com', active: true },
      { id: '2', name: 'Maria', email: 'maria@example.com', active: false },
    ]);

    renderUserList();

    expect(screen.getByText('Usuários')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('João')).toBeInTheDocument();
      expect(screen.getByText('Maria')).toBeInTheDocument();
    });
  });

  it('deve filtrar usuários pelo nome digitado', async () => {
    mockedUsersApi.getAll.mockResolvedValueOnce([
      { id: '1', name: 'João', email: 'joao@example.com', active: true },
      { id: '2', name: 'Maria', email: 'maria@example.com', active: false },
    ]);

    renderUserList();

    await waitFor(() => {
      expect(screen.getByText('João')).toBeInTheDocument();
      expect(screen.getByText('Maria')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Pesquisar por nome');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'João');

    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.queryByText('Maria')).toBeNull();
  });
});