import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import Typed from 'typed.js';
import { map, Observable } from 'rxjs';
import { GalaxyComponent } from '../galaxy/galaxy.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenubarModule, ButtonModule, CardModule, CommonModule, CarouselModule, GalaxyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  items: MenuItem[] = [];
  $myRepo: Observable<any>;
  responsiveCarousel: CarouselResponsiveOptions [] | undefined;

  private http = inject(HttpClient);
  private githubApiUrl = 'https://api.github.com/users/admiral215/repos?sort=created&direction=desc';

  constructor() {
    this.$myRepo = this.getMyRepo();
  }

  ngOnInit(): void {
    const typed = new Typed('.typing-effect', {
      strings: ['BACKEND', 'FRONTEND', 'FULLSTACK'],
      typeSpeed: 125,
      backSpeed: 125,
      loop: true,
      backDelay: 1000
    });

    this.responsiveCarousel = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

  getMyRepo() {
    return this.http.get<any[]>(this.githubApiUrl).pipe(
      map(repos => repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url
      })))
    );
  }

}


