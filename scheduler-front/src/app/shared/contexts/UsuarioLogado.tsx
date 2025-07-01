import React, { createContext, ReactNode, useCallback, useState } from "react";

interface IUsuarioLogadoData {
    nome: string;
    setNome: (nome: string) => void;
    exibirNome: () => void;
}

interface UsuarioLogadoProviderProps {
    children: ReactNode;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoData>({} as IUsuarioLogadoData);

export const UsuarioLogadoProvider: React.FC<UsuarioLogadoProviderProps> = ({ children }) => {
    const [nomeUsuario, setNomeUsuario] = useState("");

    const handleExibirNome = useCallback(() => {
        window.alert(nomeUsuario);
    }, [nomeUsuario]);

    return (
        <UsuarioLogadoContext.Provider
            value={{ nome: nomeUsuario, exibirNome: handleExibirNome, setNome: setNomeUsuario }}
        >
            {children}
        </UsuarioLogadoContext.Provider>
    );
};
