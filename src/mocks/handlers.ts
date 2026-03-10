import { http, HttpResponse } from 'msw';
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getCurrentUser
} from './data/users';

const API_BASE = '/api/users';

export const handlers = [
  // GET /api/users - Listar todos os usuários
  http.get(API_BASE, () => {
    return HttpResponse.json(getUsers());
  }),

    http.get(`${API_BASE}/me`,() => {
    const  currentUser = getCurrentUser();
    if(!currentUser){
      return HttpResponse.json(
        {message : 'Usuário não encontrado'},
        {status: 404}
      )
    }
    return HttpResponse.json(currentUser)
  }),

  // GET /api/users/:id - Buscar usuário por ID
  http.get(`${API_BASE}/:id`, ({ params }) => {
    const user = getUserById(params.id as string);
    if (!user) {
      return HttpResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    return HttpResponse.json(user);
  }),

  // POST /api/users - Criar novo usuário
  http.post(API_BASE, async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      email: string;
      active: boolean;
    };
    if (!body.name || !body.email) {
      return HttpResponse.json(
        { message: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }
    const newUser = addUser(body);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // PUT /api/users/:id - Atualizar usuário
  http.put(`${API_BASE}/:id`, async ({ params, request }) => {
    const user = getUserById(params.id as string);
    if (!user) {
      return HttpResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    const body = (await request.json()) as Partial<{
      name: string;
      email: string;
      active: boolean;
    }>;
    const updatedUser = updateUser(params.id as string, body);
    return HttpResponse.json(updatedUser);
  }),

  // DELETE /api/users/:id - Remover usuário
  http.delete(`${API_BASE}/:id`, ({ params }) => {
    const deleted = deleteUser(params.id as string);
    if (!deleted) {
      return HttpResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }
    return new HttpResponse(null, { status: 204 });
  }),
];
