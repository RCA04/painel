import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Switch,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { usersApi, User } from '../api/users';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';

type UserToDelete = {
  id: string;
  name: string;
} | null;

export function UserListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserToDelete>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ open: false, message: '', type: 'success' });

  const [searchName, setSearchName] = useState('');
  const loadUsers = () => {
    setLoading(true);
    usersApi
      .getAll()
      .then(setUsers)
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Erro ao carregar usuários',
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenNew = () => {
    navigate('/create');
  };

  const handleOpenEdit = (userId: number) => {
    navigate(`/edit/${userId}`);
  };

  const handleOpenDelete = (userId: string, userName: string) => {
    setUserToDelete({ id: userId, name: userName });
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    usersApi
      .delete(userToDelete.id)
      .then(() => {
        loadUsers();
        setSnackbar({
          open: true,
          message: 'Usuário excluído!',
          type: 'success',
        });
        handleCloseDelete();
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Erro ao excluir usuário',
          type: 'error',
        });
      });
  };

  const handleToggleStatus = (userId: string, currentActive: boolean) => {
    usersApi
      .update(userId, { active: !currentActive })
      .then((updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? updatedUser : user
          )
        );
        setSnackbar({
          open: true,
          message: 'Status atualizado!',
          type: 'success',
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Erro ao atualizar status',
          type: 'error',
        });
      });
  };

  const handleChangeSearchName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchName(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const rows = filteredUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    active: user.active,
  }));

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      sortable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      sortable: true,
    },
    {
      field: 'active',
      headerName: 'Status',
      sortable: false,
      width: 140,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Switch
            size="small"
            checked={params.row.active}
            onChange={() =>
              handleToggleStatus(params.row.id, params.row.active)
            }
            inputProps={{ 'aria-label': 'alternar status' }}
          />
          <span className="text-sm">
            {params.row.active ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() => handleOpenEdit(params.row.id)}
              aria-label="editar"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleOpenDelete(params.row.id, params.row.name)}
              color="error"
              aria-label="excluir"
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box className="min-h-screen bg-gray-100 p-8">
      <Paper className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Usuários
          </h1>
          <Button
            variant="contained"
            onClick={handleOpenNew}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Novo usuário
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
              <TextField
                label="Pesquisar por nome"
                variant="outlined"
                size="small"
                value={searchName}
                onChange={handleChangeSearchName}
              />
            </div>

            <div style={{ width: '100%' }}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5, page: 0 } },
                  sorting: {
                    sortModel: [{ field: 'name', sort: 'asc' }],
                  },
                }}
                disableRowSelectionOnClick
              />
            </div>
          </>
        )}

        {!loading && users.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhum usuário cadastrado.
          </p>
        )}
      </Paper>

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.name || ''}
      />

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
