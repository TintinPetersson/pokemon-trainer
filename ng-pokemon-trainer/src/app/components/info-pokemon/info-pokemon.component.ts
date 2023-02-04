import { Component, Input } from '@angular/core';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-info-pokemon',
  templateUrl: './info-pokemon.component.html',
  styleUrls: ['./info-pokemon.component.css']
})
export class InfoPokemonComponent {

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly http: HttpClient
  ) { }

  @Input() pokemonName: string = "";

  public isClicked: boolean = false;

  public pokemonHP: string = "";
  public pokemonWeight: string = "";
  public pokemonAttack: string = "";
  public infoText: string = "More Info";
  public loading: boolean = false;


  onMoreInfo(): void {
    this.infoText = "Less Info"
    if (this.isClicked) {
      this.infoText = "More Info"
      this.isClicked = false;
    }
    else {
      this.loading = true;
      this.isClicked = true;
      let pokemon: Pokemon | undefined = this.pokemonCatalogueService.pokemonByName(this.pokemonName)

      if (pokemon) {
        if (this.pokemonCatalogueService.pokemonAbilities(pokemon)) {
          this.pokemonCatalogueService.pokemonAbilities(pokemon)
            ?.subscribe({
              next: (data: any) => {
                this.loading = false;
                const pokemonInfo: any = data;
                console.log(pokemonInfo);
                this.pokemonHP = pokemonInfo.stats[0].base_stat;
                this.pokemonAttack = pokemonInfo.stats[1].base_stat;
                this.pokemonWeight = pokemonInfo.weight;
              },
              error: (error: HttpErrorResponse) => {
                console.log(error.message)
              },
            });
        }
      }
    }
  }
}
