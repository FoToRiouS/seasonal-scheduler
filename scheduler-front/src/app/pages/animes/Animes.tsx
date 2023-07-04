import { useNavigate } from 'react-router-dom';
import {CardAnime} from "./components/CardAnime.tsx";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useUsuarioLogado} from "../../shared/hooks/UseUsuarioLogado.ts";
import {useEffect, useState} from "react";
import {IAnime} from "../../shared/services/api/animes/AnimesService.ts";
import {MyAnimeListApi} from "../../shared/services/api/MyAnimeListApi.ts";

export const Animes = () => {
    const navigate = useNavigate();

    const [inputSrcImg, setInputSrcImg] = useState("");
    const [inputEngName, setInputEngName] = useState("");
    const [inputJpnName, setInputJpnName] = useState("");

    const [listAnimes, setListAnimes ] = useState<IAnime[]>( []);
    //     {srcImg: "https://cdn.myanimelist.net/images/anime/1674/136728.jpg", engName: "Mushoku Tensei II: Isekai Ittara Honki Dasu", jpnName: "Mushoku Tensei: Jobless Reincarnation Season 2"},
    //     {srcImg: "https://cdn.myanimelist.net/images/anime/1696/136634.jpg", engName: "Kanojo, Okarishimasu 3rd Season", jpnName: "Rent-a-Girlfriend Season 3"},
    //     {srcImg: "https://cdn.myanimelist.net/images/anime/1007/136277.jpg", engName: "Horimiya: The Missing Pieces", jpnName: "Horimiya: Piece"}
    // ])

    useEffect(() => {
        MyAnimeListApi().get(`/anime/season/2023/summer`, {
            headers: {
                "X-MAL-CLIENT-ID": "eb6aa17ec9b6961f8812f79c38318240"
            }
        })
            .then(res=> console.log(res))
            .catch(err=> console.log(err));
        // AnimesService.getBySeason(2023, "summer").then((result) => {
        //     if(result instanceof ApiException){
        //         alert(result.message)
        //     } else {
        //         setListAnimes(result);
        //     }
        // })
    });

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
                <Row className="mb-5">
                    <Col>
                        <input placeholder={"Image Source"} value={inputSrcImg} onChange={e =>  setInputSrcImg(e.currentTarget.value)}/>
                    </Col>
                    <Col>
                        <input placeholder={"Jpn Name"} value={inputJpnName} onChange={e =>  setInputJpnName(e.currentTarget.value)}/>
                    </Col>
                    <Col>
                        <input placeholder={"Eng Name"} value={inputEngName} onChange={e =>  setInputEngName(e.currentTarget.value)}/>
                    </Col>
                    <Col sm={"auto"}>
                        <Button onClick={e => {
                            setListAnimes(oldLista => {
                                return [...oldLista, {srcImg: inputSrcImg, jpnName: inputJpnName, engName: inputEngName}]
                            })
                            setInputSrcImg("");
                            setInputJpnName("");
                            setInputEngName("");
                            e.stopPropagation();
                        }}>Adicionar</Button>
                    </Col>
                </Row>
                <Row sm={3} className={"g-2"}>
                    {
                        listAnimes.map(anime => {
                            return <CardAnime image={anime.srcImg} jpnName={anime.jpnName} engName={anime.engName}/>
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
