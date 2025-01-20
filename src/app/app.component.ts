import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    // Perhatikan perubahan fragment di URL
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // Pastikan event adalah NavigationEnd
      )
      .subscribe(() => {
        const fragment = this.router.routerState.snapshot.root.fragment;

        if (fragment) {
          // Atur title berdasarkan fragment
          switch (fragment) {
            case 'home':
              this.titleService.setTitle('Home - Rully Admiral Portfolio');
              break;
            case 'projects':
              this.titleService.setTitle('Projects - Rully Admiral Portfolio');
              break;
            case 'skills':
              this.titleService.setTitle('Skills - Rully Admiral Portfolio');
              break;
            default:
              this.titleService.setTitle('Portfolio - Rully Admiral Portfolio');
              break;
          }
        } else {
          this.titleService.setTitle('Portfolio - Rully Admiral Portfolio');
        }
      });
  }
}
