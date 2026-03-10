import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { usersApi } from '../api/users';

export function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ open: false, message: '', type: 'success' });

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    usersApi
      .getById(id)
      .then((user) => {
        if (user) {
          setName(user.name);
          setEmail(user.email);
        } else {
          setSnackbar({
            open: true,
            message: 'Usuário não encontrado',
            type: 'error',
          });
          navigate('/');
        }
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Erro ao carregar usuário',
          type: 'error',
        });
        navigate('/');
      })
      .finally(() => setLoadingUser(false));
  }, [id, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name.trim() || !email.trim()) return;

    setLoading(true);
    usersApi
      .update(id, { name: name.trim(), email: email.trim() })
      .then(() => {
        setSnackbar({
          open: true,
          message: 'Usuário atualizado!',
          type: 'success',
        });
        navigate('/');
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Erro ao atualizar usuário',
          type: 'error',
        });
        setLoading(false);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loadingUser) {
    return (
      <Box className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-100 p-8">
      <Paper className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Editar usuário
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <div className="flex gap-2 justify-end mt-4">
            <Button onClick={handleCancel} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              Salvar
            </Button>
          </div>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.type}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
