import {useNavigate} from 'react-router-dom';
import {CardAnime} from "./components/CardAnime.tsx";
import {useUsuarioLogado} from "../../shared/hooks/UseUsuarioLogado.ts";
import {useEffect, useState} from "react";
import {AnimesService, IAnime} from "../../shared/services/api/animes/AnimesService.ts";
import {ApiException} from "../../shared/services/api/ApiException.ts";
import {Container, Grid, GridItem, Heading} from "@chakra-ui/react";

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
            <Container bg="tomato" minW={"full"} mb={16} centerContent>
                <Heading>Animes da Temporada</Heading>
            </Container>
            <Container maxW={"90%"} centerContent>
                <Grid templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]} gap={10}>
                    {
                        listAnimes.map(anime => {
                            return (
                                <GridItem>
                                    <CardAnime key={anime.title} image={anime.mainPicture.large} jpnName={anime.title} engName={anime.alternativeTitles.en}/>
                                </GridItem>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    )
}
