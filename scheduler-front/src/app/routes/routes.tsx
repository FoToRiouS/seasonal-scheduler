import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ListAnimes} from "../pages/animes/ListAnimes.tsx";
import {Login} from "../pages/login/Login.tsx";
import {UsuarioLogadoProvider} from "../shared/contexts/UsuarioLogado.tsx";
import {ScheduleAnimes} from "../pages/animes/ScheduleAnimes.tsx";

export const Rotas = () => {

    return(
        <UsuarioLogadoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/animes/list" element={<ListAnimes/>}/>
                    <Route path="/animes/schedule" element={<ScheduleAnimes/>}/>

                    <Route path="*" element={<Navigate to="/animes/list"/>}/>
                </Routes>
            </BrowserRouter>
        </UsuarioLogadoProvider>
    );

}