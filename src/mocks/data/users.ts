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
  habilitacao: string;
  profile_pic: string;
}

// Banco de dados em memória para simulação
let users: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    active: true,
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    active: true,
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    active: false,
  },
  {
    id: '4',
    name: 'Ana Souza',
    email: 'ana.souza@email.com',
    active: true,
  },
  {
    id: '5',
    name: 'Carlos Lima',
    email: 'carlos.lima@email.com',
    active: false,
  },
  {
    id: '6',
    name: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    active: true,
  },
  {
    id: '7',
    name: 'Rafael Almeida',
    email: 'rafael.almeida@email.com',
    active: true,
  },
  {
    id: '8',
    name: 'Beatriz Rocha',
    email: 'beatriz.rocha@email.com',
    active: false,
  },
  {
    id: '9',
    name: 'Lucas Fernandes',
    email: 'lucas.fernandes@email.com',
    active: true,
  },
  {
    id: '10',
    name: 'Juliana Pereira',
    email: 'juliana.pereira@email.com',
    active: true,
  },
  {
    id: '11',
    name: 'Marcos Silva',
    email: 'marcos.silva@email.com',
    active: false,
  },
  {
    id: '12',
    name: 'Patrícia Gomes',
    email: 'patricia.gomes@email.com',
    active: true,
  },
  {
    id: '13',
    name: 'Rodrigo Nunes',
    email: 'rodrigo.nunes@email.com',
    active: true,
  },
  {
    id: '14',
    name: 'Camila Dias',
    email: 'camila.dias@email.com',
    active: false,
  },
  {
    id: '15',
    name: 'Thiago Moreira',
    email: 'thiago.moreira@email.com',
    active: true,
  },
];

let currentUser: CurrentUser = {
  id:'1',
  name: 'Adalberto Gomes',
  email: 'Adalberto123@email.com',
  idade: '36',
  habilitacao:'B',
  profile_pic:'https://picsum.photos/200'
}


export const getUsers = () => [...users];

export const getUserById = (id: string) => users.find((u) => u.id === id);

export const addUser = (user: Omit<User, 'id'>) => {
  const newUser: User = {
    ...user,
    id: String(Date.now()),
    active: user.active ?? true,
  };
  users = [...users, newUser];
  return newUser;
};

export const updateUser = (id: string, data: Partial<Omit<User, 'id'>>) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data };
  return users[index];
};

export const deleteUser = (id: string) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users = users.filter((u) => u.id !== id);
  return true;
};

export const getCurrentUser = () => {
  return currentUser;
};
