import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.css']
})
export class PokemonCataloguePage implements OnInit {

  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService) { }

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogueService.pokemons
  }
  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }
  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  ngOnInit(): void {
    this.pokemonCatalogueService.fetchPokemons()
  }
}