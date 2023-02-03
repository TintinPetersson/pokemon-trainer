import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: Pokemon[] = [];

  searchText: string = "";

  constructor() {
  }

  onPokemonHover(): void {
    console.log("hej")
  }

  ngOnInit(): void {
  }
}
