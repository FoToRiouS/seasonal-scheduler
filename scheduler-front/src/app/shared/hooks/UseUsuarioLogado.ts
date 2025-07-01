import { useContext } from "react";
import { UsuarioLogadoContext } from "../contexts/UsuarioLogado.tsx";

export const useUsuarioLogado = () => {
    return useContext(UsuarioLogadoContext);
};
