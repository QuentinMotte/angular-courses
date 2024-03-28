import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IUser} from "../user/user.model";
import {UserService} from "../user/user.service";

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})
export class SiteHeaderComponent implements OnInit {
  user: IUser | null = null;
  showSignOutMenu: boolean = false;

  constructor(private userSvc: UserService) {
  }

  ngOnInit() {
    this.userSvc.getUser().subscribe(user => this.user = user);
  }

  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    this.userSvc.signOut();
    this.showSignOutMenu = false;
  }
}
