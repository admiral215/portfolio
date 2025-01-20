import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '', // Default route
    component: HomeComponent, // HomeComponent will be displayed for the root path
  },
];
