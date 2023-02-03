import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly userService: UserService
  ) { }

  get user(): User | undefined {
    return this.userService.user;
  }

  get pokemons(): Pokemon[] {

    const pokemonArray: Pokemon[] | any = [];
    const caughtPokemonList = this.user?.pokemon;

    if (caughtPokemonList) {
      for (let caughtPokemon of caughtPokemonList) {

        let pokemon: Pokemon | undefined = this.pokemonCatalogueService.pokemonByName(caughtPokemon)

        if (pokemon) {
          const urlOnlyDigits = pokemon.url.replace(/\D/g, '');
          const pokemonImageId = urlOnlyDigits.substring(1);

          pokemon.image = pokemonImageId;
        }

        pokemonArray.push(pokemon);
      }
      return pokemonArray;
    }
    return [];
  }

  ngOnInit(): void {
  }
}
