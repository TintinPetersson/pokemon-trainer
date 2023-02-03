import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { CaughtPokemonService } from 'src/app/services/caught-pokemon.service';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly caughtPokemonService: CaughtPokemonService) { }

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons();
  }
  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('pokemons') === null)
      this.pokemonCatalogueService.fetchPokemons();
  }
}