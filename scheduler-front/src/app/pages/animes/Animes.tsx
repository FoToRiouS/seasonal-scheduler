import { useNavigate } from 'react-router-dom';
import {CardAnime} from "./components/CardAnime.tsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useUsuarioLogado} from "../../shared/hooks/UseUsuarioLogado.ts";
import {useEffect, useState} from "react";
import {AnimesService, IAnime} from "../../shared/services/api/animes/AnimesService.ts";
import {ApiException} from "../../shared/services/api/ApiException.ts";

export const Animes = () => {
    const navigate = useNavigate();

    const [listAnimes, setListAnimes ] = useState<IAnime[]>( []);

    useEffect(() => {
        AnimesService.getBySeason(2023, "summer").then(res=> {
            if(res instanceof ApiException) {
                console.log(res.message);
            } else {
                console.log(res);
                setListAnimes(res);
            }
        });
    }, []);

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
                    {
                        listAnimes.map(anime => {
                            return <CardAnime key={anime.title} image={anime.mainPicture.large} jpnName={anime.title} engName={anime.alternativeTitles.en}/>
                        })
                    }
                    <div className={"w-100"}/>
                    <Col sm={12} className={"d-flex justify-content-center"}>
                        <Button variant={"success"} onClick={redirectToLogin}>Voltar</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
