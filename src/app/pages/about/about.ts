import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { Stat } from '../../shared/models/portfolio.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly bio = signal(
    `I'm Aiman Syafiq, a full-stack engineer focused on well-crafted web and mobile apps. I build across the stack with Angular, Ionic, TypeScript, Node.js, and practical cloud tools. My work leans on clean interfaces, reliable data flows, performance, and maintainable code that can keep moving after launch.`
  );

  protected readonly stats = signal<Stat[]>([
    { value: '2+', label: 'Years Exp.', color: 'yellow' },
    { value: '20+', label: 'Projects', color: 'pink' },
    { value: '∞', label: 'Coffee', color: 'orange', icon: 'ph-fill ph-coffee' },
    { value: '💯', label: 'Passion', color: 'white' },
  ]);
}
