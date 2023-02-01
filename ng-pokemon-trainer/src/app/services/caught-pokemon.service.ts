import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class CaughtPokemonService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonCatalogoueService: PokemonCatalogueService,
    private readonly userService: UserService,
  ) { }


  public addToCaughtPokemons(pokemonName: string): Observable<User> {

    if (!this.userService.user) {
      throw new Error("There is no user");
    }

    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined = this.pokemonCatalogoueService.pokemonByName(pokemonName);

    if (!pokemon) {
      throw new Error("No pokémon with that name: " + pokemonName)
    }

    if (this.userService.inCaughtPokemon(pokemonName)) {
      throw new Error("This pokémon is already caught");
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true;

    return this.http.patch<User>(`${apiUsers}/${user.id}`, {
      pokemon: [...user.pokemon, pokemon.name]
    }, {
      headers
    })
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        }),
        finalize(() => {
          this._loading = false
        })
      )
  }
}
