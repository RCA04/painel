import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../context/currentUserContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function Header() {
    const nav = useNavigate();

    const list = () => {
        nav('/')
    }

    const { currentUser, loading, login, logoff } = useCurrentUser();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GESTOR DE USUÁRIOS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={list}
                        >
                            <Typography>
                                Lista
                            </Typography>
                        </Button>
                    </Box>

                    {!currentUser && (
                        <Button loading={loading} loadingPosition='start' onClick={login} variant='contained' color='warning' size='small'>
                            {loading ? 'Logando...' : 'Logar'}
                        </Button>
                    )}

                    {currentUser && (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                <Avatar alt="profile pic" src={currentUser?.profile_pic}></Avatar>
                                <Typography sx={{ marginLeft: '10px' }}>
                                    {currentUser?.name}
                                </Typography>
                            </Box>
                            <Button loading={loading} loadingPosition='start' onClick={logoff} variant='contained' color='error' size='small'>
                                {loading ? "Saindo..." : "Sair"}
                            </Button>
                        </>
                    )}

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;

