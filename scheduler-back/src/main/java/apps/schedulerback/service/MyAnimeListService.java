package apps.schedulerback.service;

import apps.schedulerback.model.mal.AnimeMAL;
import apps.schedulerback.model.mal.MyAnimeListResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MyAnimeListService {

    final WebClient webClientMal;

    public MyAnimeListService(@Qualifier("webClientMAL") WebClient webClientMal) {
        this.webClientMal = webClientMal;
    }

    public List<AnimeMAL> findBySeason(Long year, String season) {
        String uri = String.format(
                "/anime/season/%d/%s?limit=500&fields=alternative_titles,broadcast,media_type,start_season,mean,genres&nsfw=true",
                year,
                season
        );

        List<AnimeMAL> animes = webClientMal.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(MyAnimeListResponse.class)
                .map(MyAnimeListResponse::data)
                .block();

        if (animes == null) {
            return List.of();
        }

        return animes.stream()
                .filter(anime -> "tv".equals(anime.mediaType()) || "ona".equals(anime.mediaType()) || "ova".equals(anime.mediaType()))
                .filter(anime -> anime.startSeason() != null && anime.startSeason().year() == year && anime.startSeason().season().equals(season))
                .filter(anime -> anime.genres() != null && anime.genres().stream().noneMatch(genre -> "Hentai".equals(genre.name())))
                .collect(Collectors.toList());
    }

    public AnimeMAL findById(Long id){
        String uri = String.format(
                "/anime/%s?fields=alternative_titles,broadcast,media_type,start_season,mean,genres",
                id
        );

        Map mono = webClientMal.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        return webClientMal.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(AnimeMAL.class)
                .block();
    }

}
