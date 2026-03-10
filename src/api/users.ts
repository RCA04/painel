export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  idade: string;
  habilitacao:string;
  profile_pic:string;
}

const API_BASE = '/api/users';

export const usersApi = {
  getAll: () =>
    fetch(API_BASE).then((res) => {
      if (!res.ok) throw new Error('Erro ao buscar usuários');
      return res.json() as Promise<User[]>;
    }),
    
  getCurrentUser: () => 
    fetch(`${API_BASE}/me`,).then((res)=>{
      if (!res.ok) throw new Error('Erro ao buscar usuário atual');
      return res.json() as Promise<CurrentUser>;
    }),

  getById: (id: string) =>
    fetch(`${API_BASE}/${id}`).then((res) => {
      if (res.status === 404) return null;
      if (!res.ok) throw new Error('Erro ao buscar usuário');
      return res.json() as Promise<User>;
    }),

  create: (data: Omit<User, 'id'>) =>
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error('Erro ao criar usuário');
      return res.json() as Promise<User>;
    }),

  update: (id: string, data: Partial<Omit<User, 'id'>>) =>
    fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 404) throw new Error('Usuário não encontrado');
      if (!res.ok) throw new Error('Erro ao atualizar usuário');
      return res.json() as Promise<User>;
    }),

  delete: (id: string) =>
    fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then((res) => {
      if (res.status === 404) throw new Error('Usuário não encontrado');
      if (!res.ok) throw new Error('Erro ao remover usuário');
      return res.ok;
    }),

};
