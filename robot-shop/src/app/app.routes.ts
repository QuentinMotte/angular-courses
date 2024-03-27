import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent, title: 'Home - Robot Shop'},
  { path: 'catalog/:filter',loadComponent: () => import('./catalog/catalog.component').then(m => m.CatalogComponent), title: 'Catalog - Robot Shop'},
  {path: 'cart', loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent), title: 'Cart - Robot Shop'},
  { path: '**', redirectTo: '/home' }
];
