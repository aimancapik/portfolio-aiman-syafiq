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
    `I'm Aiman Syafiq, a full-stack engineer with a thing for well-crafted apps. I build across the whole stack: Angular, Ionic, Node.js, and everything in between. I actually give a damn about the details. Good code and good taste, all in one.`
  );

  protected readonly stats = signal<Stat[]>([
    { value: '2+', label: 'Years Exp.', color: 'yellow' },
    { value: '20+', label: 'Projects', color: 'pink' },
    { value: '∞', label: 'Coffee', color: 'orange', icon: 'ph-fill ph-coffee' },
    { value: '💯', label: 'Passion', color: 'white' },
  ]);
}
