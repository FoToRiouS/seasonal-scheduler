import { useNavigate } from 'react-router-dom';
import {CardAnime} from "./components/CardAnime.tsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useUsuarioLogado} from "../../shared/hooks/UseUsuarioLogado.ts";
export const Animes = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate("/login");
    }

    const {nome, exibirNome} = useUsuarioLogado();

    return (
        <>
            <Container>
                <Row className="mb-5">
                    <Col sm={12} className="fs-1 text-center">
                        <span>{nome}</span>
                    </Col>
                    <Col sm={12} className={"d-flex justify-content-center"}>
                        <Button variant={"primary"} onClick={exibirNome}>Exibir Nome</Button>
                    </Col>
                </Row>
                <Row sm={3} className={"g-2"}>
                    <CardAnime image="https://cdn.myanimelist.net/images/anime/1674/136728.jpg" jpnName="Mushoku Tensei II: Isekai Ittara Honki Dasu" engName="Mushoku Tensei: Jobless Reincarnation Season 2">
                        Teste 1
                    </CardAnime>
                    <CardAnime image="https://cdn.myanimelist.net/images/anime/1696/136634.jpg" jpnName="Kanojo, Okarishimasu 3rd Season" engName="Rent-a-Girlfriend Season 3">
                        Teste 2
                    </CardAnime>

                    <div className={"w-100"}/>
                    <Col sm={12} className={"d-flex justify-content-center"}>
                        <Button variant={"success"} onClick={redirectToLogin}>Voltar</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
