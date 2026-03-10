import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrentUserProvider, useCurrentUser } from '../../context/currentUserContext';
import { usersApi } from '../../api/users';

jest.mock('../../api/users');

const mockedUsersApi = usersApi as jest.Mocked<typeof usersApi>;

function TestComponent() {
  const { currentUser, login, logoff, loading } = useCurrentUser();

  return (
    <div>
      <button onClick={login}>login</button>
      <button onClick={logoff}>logoff</button>
      <span>{loading ? 'carregando' : 'pronto'}</span>
      <span>{currentUser ? currentUser.name : 'sem usuário'}</span>
    </div>
  );
}

describe('CurrentUserProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve atualizar o estado global ao fazer login', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    mockedUsersApi.getCurrentUser.mockResolvedValueOnce({
      id: '1',
      name: 'Usuário Atual',
      email: 'atual@example.com',
      idade: '30',
      habilitacao: 'A',
      profile_pic: 'http://example.com/pic.png',
    });

    render(
      <CurrentUserProvider>
        <TestComponent />
      </CurrentUserProvider>
    );

    expect(screen.getByText('sem usuário')).toBeInTheDocument();

    await user.click(screen.getByText('login'));
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText('Usuário Atual')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});

