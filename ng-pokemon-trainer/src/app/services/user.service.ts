import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user?: User;

  public get user(): User | undefined {
    return this._user;
  }

  public set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }

  public inCaughtPokemon(pokemonName: string): boolean {
    if (this._user) {
      return Boolean(this.user?.pokemon.find((pokemon: string) => pokemon === pokemonName))
    }
    return false;
  }
}