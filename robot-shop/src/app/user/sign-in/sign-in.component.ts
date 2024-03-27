import {Component} from '@angular/core';
import {IUserCredentials} from "../user.model";
import {FormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class SignInComponent {
  credentials: IUserCredentials = {
    email: '',
    password: ''
  }

  constructor(private userSvc : UserService,private router: Router) {
  }

  signIn() {
    this.userSvc.signIn(this.credentials).subscribe(() => {
      this.router.navigate(['/catalog']);
    })
  }

}
