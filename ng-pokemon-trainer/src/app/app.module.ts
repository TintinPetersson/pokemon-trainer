import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './pages/login/login.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { LoginFormComponent } from './components/login-form/login-form.component'
import { FormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatchPokemonButtonComponent } from './components/catch-pokemon-button/catch-pokemon-button.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InfoPokemonComponent } from './components/info-pokemon/info-pokemon.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    TrainerPage,
    PokemonCataloguePage,
    LoginFormComponent,
    PokemonListComponent,
    NavbarComponent,
    CatchPokemonButtonComponent,
    InfoPokemonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
