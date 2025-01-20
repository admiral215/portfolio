import { Component, OnDestroy, OnInit } from '@angular/core';
import { gsap } from 'gsap';
interface GalaxyAnimations {
  sun?: gsap.core.Tween;
  mercury?: gsap.core.Tween;
  venus?: gsap.core.Tween;
  earth?: gsap.core.Tween;
  mars?: gsap.core.Tween;
  planets?: gsap.core.Tween;
}


@Component({
  selector: 'app-galaxy',
  imports: [],
  templateUrl: './galaxy.component.html',
  styleUrl: './galaxy.component.css'
})
export class GalaxyComponent implements OnInit, OnDestroy {
  private timelines: GalaxyAnimations = {};

  ngOnInit(): void {
    this.initializeAnimations();
    this.addHoverListeners();
  }

  private initializeAnimations() {
    // Sun rotation
    this.timelines.sun = gsap.to('.sun', {
      duration: 20,
      rotation: 360,
      repeat: -1,
      ease: 'none'
    });

    // Mercury orbit with two planets
    this.timelines.mercury = gsap.to('.orbit-1', {
      duration: 4,
      rotation: 360,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    // Venus orbit
    this.timelines.venus = gsap.to('.orbit-2', {
      duration: 7,
      rotation: 360,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    // Earth orbit with three planets
    this.timelines.earth = gsap.to('.orbit-3', {
      duration: 10,
      rotation: 360,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    // Mars orbit
    this.timelines.mars = gsap.to('.orbit-4', {
      duration: 13,
      rotation: 360,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%'
    });

    // Planet self-rotation animations
    this.timelines.planets = gsap.to(
      ['.mysql', '.postgresql' , '.sqlserver', '.quarkus', '.java', '.spring', '.ts', '.angular', '.js','.flutter', '.golang', '.gin'],
      {
        duration: 5,
        rotation: 360,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%'
      }
    );
  }

  private addHoverListeners() {
    const solarSystem = document.querySelector('.solar-system');

    if (solarSystem) {
      solarSystem.addEventListener('mouseenter', () => this.pauseAnimations());
      solarSystem.addEventListener('mouseleave', () => this.resumeAnimations());
    }
  }

  private pauseAnimations() {
    Object.values(this.timelines).forEach((tween: gsap.core.Tween | undefined) => {
      tween?.timeScale(0.5);
    });
  }

  private resumeAnimations() {
    Object.values(this.timelines).forEach((tween: gsap.core.Tween | undefined) => {
      tween?.timeScale(1);
    });
  }

  ngOnDestroy() {
    Object.values(this.timelines).forEach((tween: gsap.core.Tween | undefined) => {
      tween?.kill();
    });
    this.timelines = {};
  }
}
