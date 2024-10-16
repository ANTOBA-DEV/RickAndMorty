import { Component, OnInit } from '@angular/core';
import { RickAndMortyServiceService } from '../character-cards-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-character-cards',
  templateUrl: './character-cards.component.html',
  styleUrls: ['./character-cards.component.css']
})
export class CharacterCardsComponent implements OnInit {

  charData: any[] = [];

  constructor(private apiService: RickAndMortyServiceService, private http: HttpClient) {}

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe((response) => {
      this.charData = response.results;

      this.charData.forEach(char => {
        char.episodesDetails = [];
        char.showEpisodes = false; 
        char.episode.forEach((episodeUrl: string) => {
          this.http.get(episodeUrl).subscribe((episodeDetail) => {
            char.episodesDetails.push(episodeDetail);
          });
        });
      });
    });
  }

  toggleEpisodes(char: any): void {
    char.showEpisodes = !char.showEpisodes;
  }
}
