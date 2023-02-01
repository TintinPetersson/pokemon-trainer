import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CaughtPokemonService } from 'src/app/services/caught-pokemon.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent {

  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.caughtPokemonService.loading;
  }

  constructor(
    private readonly caughtPokemonService: CaughtPokemonService
  ) { }

  onCatchClick(): void {
    this.caughtPokemonService.addToCaughtPokemons(this.pokemonName)
      .subscribe({
        next: (response: User) => {
          console.log("NEXT", response)
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message);
        }
      })
  }
}
