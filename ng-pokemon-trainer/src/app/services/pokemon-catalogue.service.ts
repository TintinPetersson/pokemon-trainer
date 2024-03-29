import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators'
import { Pokemon } from '../models/pokemon.model';
import { Observable } from 'rxjs';
const { apiPokemons } = environment;
@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _error: string = "";
  private _loading: boolean = false;

  public pokemons(): Pokemon[] {

    for (let pokemon of this._pokemons) {

      const urlOnlyDigits = pokemon.url.replace(/\D/g, '');
      const pokemonImageId = urlOnlyDigits.substring(1);

      pokemon.image = pokemonImageId;
    }

    return this._pokemons;
  }

  public get error(): string {
    return this._error;
  }

  public get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  private _pokemons: Pokemon[] = JSON.parse(sessionStorage.getItem('pokemons') || '[]');

  public fetchPokemons(): void {
    this._loading = true;
    this.http.get<Pokemon[]>(apiPokemons)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (data: any) => {
          this._pokemons = data.results;
          sessionStorage.setItem('pokemons', JSON.stringify(data.results))
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        },
      });
  }
  public pokemonByName(name: string | undefined): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.name === name);
  }

  pokemonAbilities(pokemon: Pokemon | undefined) {
    if (pokemon) {
      const url = pokemon?.url;
      return this.http.get<Pokemon>(url)
    }
    return undefined;
  }
}