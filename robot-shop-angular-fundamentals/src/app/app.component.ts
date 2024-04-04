import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SiteHeaderComponent} from "./site-header/site-header.component";
import {CatalogComponent} from "./catalog/catalog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, CatalogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'robot-shop-angular-fundamentals';
}
