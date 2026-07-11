import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Skills } from './pages/skills/skills';
import { Contact } from './pages/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Home, About, Projects, Skills, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const elements = document.querySelectorAll<HTMLElement>(
      'main section:not(#hero), .project-card, .skills__category, .about__principles li',
    );

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('scroll-reveal--visible');
          this.observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );

    for (const element of elements) {
      element.classList.add('scroll-reveal');
      this.observer.observe(element);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
