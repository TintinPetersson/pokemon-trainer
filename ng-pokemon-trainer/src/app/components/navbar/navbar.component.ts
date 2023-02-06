import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  get user(): User | undefined {
    if (this.userService.user) {
      this.userService.user.username = this.userService.user?.username.toLocaleUpperCase();
    }
    return this.userService.user;
  }

  constructor(
    private readonly userService: UserService
  ) { }

  handleLogout(): void {
    this.userService.logoutUser()
  }
}
