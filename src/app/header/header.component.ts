import { Component, HostListener, OnInit, Renderer2, ElementRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, PanelMenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  activeFragment: string = '#home';
  menuVisible = false;
  items: MenuItem[];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.items = [
      {
        label: 'HOME',
        fragment: '#home',
      },
      {
        label: 'PROJECTS',
        fragment: '#projects',
      },
      {
        label: 'SKILLS',
        fragment: '#skills',
      },
    ];
  }

  ngOnInit() {
    this.activeFragment = '#home';
    const header = this.el.nativeElement.querySelector('#header');
    this.renderer.setStyle(header, 'transition', 'background-color 0.5s ease');
  }

  ngAfterViewInit() {
    this.setActiveOnScroll();
  }

  setActive(fragment: any, event: Event): void {
    event.preventDefault();
    this.activeFragment = fragment;
    this.router.navigate([], {
      fragment: fragment.substring(1),
    });

    this.scrollToFragment(fragment);
  }

  scrollToFragment(fragment: string): void {
    const targetElement = document.querySelector(fragment);
    const header = document.querySelector('#header') as HTMLElement;
    const headerHeight = header ? header.offsetHeight + 10 : 0;

    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }

  isActive(item: any): boolean {
    return this.activeFragment === item.fragment;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.setActiveOnScroll();
    this.setBackgroundHeaderOnScroll()
  }

  setActiveOnScroll() {
    const divs = document.querySelectorAll('.tracked-div');
    const divsVisibility: Array<{ id: string, visiblePercentage: number, rectTop: number }> = [];

    // Get header height
    const header = document.querySelector('#header') as HTMLElement;
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const windowHeight = window.innerHeight - headerHeight;

    divs.forEach((div: Element) => {
      const htmlDiv = div as HTMLElement;
      const rect = htmlDiv.getBoundingClientRect();
      const rectHeight = rect.height;


      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visiblePercentage = (visibleHeight / rectHeight) * 100;

      divsVisibility.push({
        id: htmlDiv.id,
        visiblePercentage,
        rectTop: rect.top - headerHeight
      });
    });


    const visibleDivs = divsVisibility.filter(div =>
      div.visiblePercentage > 0 && div.rectTop <= headerHeight
    );

    if (visibleDivs.length > 0) {
      const mostVisibleDiv = visibleDivs.sort((a, b) => {
        if (Math.abs(a.visiblePercentage - b.visiblePercentage) < 10) {
          return Math.abs(a.rectTop) - Math.abs(b.rectTop);
        }
        return b.visiblePercentage - a.visiblePercentage;
      })[0];

      if (mostVisibleDiv) {
        const newFragment = `#${mostVisibleDiv.id}`;
        if (this.activeFragment !== newFragment) {
          this.activeFragment = newFragment;
          this.router.navigate([], {
            fragment: mostVisibleDiv.id,
            replaceUrl: true
          });
        }
      }
    }
  }

  setBackgroundHeaderOnScroll() {
    const header = this.el.nativeElement.querySelector('#header');

    if (window.scrollY > 0) {
      this.renderer.setStyle(header, 'background-color', '#172554');
    } else {
      this.renderer.setStyle(header, 'background-color', 'transparent');
    }
  }
}
