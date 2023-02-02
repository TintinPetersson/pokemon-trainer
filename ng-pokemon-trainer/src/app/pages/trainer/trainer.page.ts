import { Component, OnInit } from '@angular/core';
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


  ngOnInit(): void {
  }
}
