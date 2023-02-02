import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CaughtPokemonService } from 'src/app/services/caught-pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  public isCaught: boolean = false;
  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.caughtPokemonService.loading;
  }

  constructor(
    private readonly caughtPokemonService: CaughtPokemonService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.isCaught = this.userService.inCaughtPokemon(this.pokemonName)
  }

  onCatchClick(): void {
    this.caughtPokemonService.addToCaughtPokemons(this.pokemonName)
      .subscribe({
        next: (user: User) => {
          this.isCaught = this.userService.inCaughtPokemon(this.pokemonName);
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message);
        }
      })
  }
}
