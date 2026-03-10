import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserListPage } from './pages/UserListPage';
import { UserCreatePage } from './pages/UserCreatePage';
import { UserEditPage } from './pages/UserEditPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import { useCurrentUser } from './context/currentUserContext';

function App() {
  const { theme: themeMode } = useCurrentUser();

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Header />

      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/create" element={<UserCreatePage />} />
        <Route path="/edit/:id" element={<UserEditPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
