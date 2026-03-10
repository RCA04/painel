import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { UserCreatePage } from '../../pages/UserCreatePage';
import { usersApi } from '../../api/users';

jest.mock('../../api/users');

const mockedUsersApi = usersApi as jest.Mocked<typeof usersApi>;

function renderCreatePage() {
  return render(
    <MemoryRouter initialEntries={['/create']}>
      <UserCreatePage />
    </MemoryRouter>
  );
}

describe('UserCreatePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo usuário ao clicar em "Salvar"', async () => {
    mockedUsersApi.create.mockResolvedValueOnce({
      id: '1',
      name: 'Novo Usuário',
      email: 'novo@example.com',
      active: true,
    });

    renderCreatePage();

    const nameInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const saveButton = screen.getByRole('button', { name: 'Salvar' });

    await userEvent.type(nameInput, 'Novo Usuário');
    await userEvent.type(emailInput, 'novo@example.com');
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockedUsersApi.create).toHaveBeenCalledWith({
        name: 'Novo Usuário',
        email: 'novo@example.com',
      });
    });
  });
});

