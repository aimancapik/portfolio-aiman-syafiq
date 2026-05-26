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
    `I'm Aiman Syafiq, a software engineer with a deep passion for crafting robust, scalable web applications. I specialize in Angular, TypeScript, and full-stack development — bridging the gap between beautiful design and rock-solid engineering.`
  );

  protected readonly stats = signal<Stat[]>([
    { value: '2+', label: 'Years Exp.', color: 'yellow' },
    { value: '20+', label: 'Projects', color: 'pink' },
    { value: '∞', label: 'Coffee', color: 'orange', icon: 'ph-fill ph-coffee' },
    { value: '💯', label: 'Passion', color: 'white' },
  ]);
}
