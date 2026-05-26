import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { SkillCategory } from '../../shared/models/portfolio.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly categories = signal<SkillCategory[]>([
    {
      title: 'Frontend',
      icon: 'ph-bold ph-browser',
      color: 'blue',
      rotation: '-1deg',
      hoverColor: 'yellow',
      skills: ['Angular', 'TypeScript', 'SCSS', 'RxJS', 'Signals'],
    },
    {
      title: 'Backend',
      icon: 'ph-bold ph-database',
      color: 'pink',
      rotation: '2deg',
      hoverColor: 'pink',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      title: 'DevOps & Tools',
      icon: 'ph-bold ph-wrench',
      color: 'green',
      rotation: '-2deg',
      hoverColor: 'green',
      skills: ['Docker', 'Firebase', 'Git', 'Linux', 'Figma'],
    },
  ]);
}
