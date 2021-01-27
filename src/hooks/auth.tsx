import React, { createContext, useState, useContext } from 'react';

interface IAuthContext {
    logged: boolean;
    SignIn(email: string, password: string): void;
    SignOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        return !!isLogged;
    });

    const SignIn = (email: string, password: string) => {
        if (email === 'mateusviniciussilva07@gmail.com' && password === '123') {
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLogged(true);
        } else {
            alert('Senha ou usuário inválidos!');
        }
    }

    const SignOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, SignIn, SignOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
