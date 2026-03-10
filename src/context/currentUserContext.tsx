import React, { createContext, useContext, useState, ReactNode } from "react";
import { usersApi } from "../api/users";

export interface CurrentUser {
    id: string;
    name: string;
    email: string;
    idade: string;
    habilitacao: string;
    profile_pic: string;
}


interface CurrentUserContextType {
    currentUser: CurrentUser | null;
    setCurrentUser: (data: CurrentUser | null) => void;
    loading: boolean;
    login: () => void;
    logoff: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

interface CurrentUserProps {
    children: ReactNode;
}

export function CurrentUserProvider({ children }: CurrentUserProps) {
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    const login = () => {
        setLoading(true)

        setTimeout(() => {
            usersApi
                .getCurrentUser()
                .then((user) => {
                    setCurrentUser(user);
                })
                .catch((error) => {
                    console.error('Erro ao buscar usuário atual:', error);
                    setCurrentUser(null);
                }).finally(() => setLoading(false))

        }, 2000)
    }

    const logoff = () => {
        setLoading(true)

        setTimeout(() => {
            setCurrentUser(null)
            setLoading(false)
        }, 2000)

    }

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const value: CurrentUserContextType = {
        currentUser,
        setCurrentUser,
        loading,
        login,
        logoff,
        theme,
        toggleTheme,
    }

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUser(): CurrentUserContextType {
    const context = useContext(CurrentUserContext);
    if (context === undefined) {
        throw new Error("sem Provider");
    }
    return context;
}

