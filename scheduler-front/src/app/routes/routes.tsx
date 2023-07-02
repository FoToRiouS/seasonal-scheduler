import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Animes} from "../pages/animes/Animes.tsx";
import {Login} from "../pages/login/Login.tsx";
import {UsuarioLogadoProvider} from "../shared/contexts/UsuarioLogado.tsx";

export const Rotas = () => {

    return(
        <UsuarioLogadoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/animes" element={<Animes/>}/>

                    <Route path="*" element={<Navigate to="/animes"/>}/>
                </Routes>
            </BrowserRouter>
        </UsuarioLogadoProvider>
    );

}