import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { Project } from '../../shared/models/portfolio.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = signal<Project[]>([
    {
      title: 'Finance Flow',
      description: 'A high-performance dashboard for tracking crypto and fiat assets in real-time using WebSockets.',
      image: '',
      tags: ['Angular', 'Node.js'],
      liveUrl: '#',
      codeUrl: '#',
      accentColor: 'blue',
    },
    {
      title: 'BrutalTask',
      description: 'A visually aggressive, no-nonsense task manager that yells at you if you miss deadlines.',
      image: '',
      tags: ['Angular', 'Firebase'],
      liveUrl: '#',
      codeUrl: '#',
      accentColor: 'pink',
    },
    {
      title: 'RetroKicks',
      description: 'Headless e-commerce platform for vintage sneakers, integrating Stripe for smooth payments.',
      image: '',
      tags: ['Next.js', 'Stripe'],
      liveUrl: '#',
      codeUrl: '#',
      accentColor: 'orange',
    },
  ]);
}
