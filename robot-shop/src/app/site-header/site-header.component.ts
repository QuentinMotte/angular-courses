import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

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
export class SiteHeaderComponent {

}
