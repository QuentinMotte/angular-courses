import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'bot-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
