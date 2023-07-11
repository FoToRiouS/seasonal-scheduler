import {Link, useNavigate} from "react-router-dom";
import {useCallback, useMemo, useRef, useState} from "react";
import {InputLogin} from "./components/InputLogin.tsx";
import {useUsuarioLogado} from "../../shared/hooks/UseUsuarioLogado.ts";
import {Template} from "../../shared/components/Template.tsx";

export const Login = () => {
    const navigate = useNavigate();

    const passwordRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
        
    const usuarioLogadoContext = useUsuarioLogado();
    
    const handleEntrar = useCallback(() => {
        usuarioLogadoContext.setNome(user + "\n" + password);
        navigate("/animes");
    }, [password, user, usuarioLogadoContext]);

    const lenghtUser  = useMemo(() => {
        return user.length;
    }, [user]);

    return(
        <Template>
            <div>
                <h1>Login</h1>
                <p>Tamanho do login: {lenghtUser}</p>
                <form>
                    <InputLogin
                        label="Usuário"
                        value={user}
                        onChange={newValue => setUser(newValue)}
                        onPressEnter={() => passwordRef.current?.focus()}
                    />

                    <InputLogin
                        label="Senha"
                        value={password}
                        type="password"
                        ref={passwordRef}
                        onChange={newValue => setPassword(newValue)}
                    />
                    <button type="button" onClick={handleEntrar}>Login</button>
                </form>
                <Link to="/animes">Animes</Link>
            </div>
        </Template>
    )
}