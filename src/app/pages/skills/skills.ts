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
      skills: ['Ionic 8', 'Angular 18', 'TypeScript', 'SCSS', 'Signals', 'RxJS', 'React', 'Flutter', 'Tailwind'],
    },
    {
      title: 'Backend',
      icon: 'ph-bold ph-database',
      color: 'pink',
      rotation: '2deg',
      hoverColor: 'pink',
      skills: [
        'Node.js',
        'Express',
        'Supabase',
        'SQL Server',
        'PostgreSQL',
        'REST API',
        'OpenAI API',
        'AWS SES',
        'Python',
      ],
    },
    {
      title: 'DevOps & Tools',
      icon: 'ph-bold ph-wrench',
      color: 'green',
      rotation: '-2deg',
      hoverColor: 'green',
      skills: [
        'Firebase',
        'Git',
        'Figma',
        'Vercel',
        'Railway',
        'Linux',
        'Ollama',
        'Docker',
        'Postman',
        'GitHub',
        'Hostinger VPS',
      ],
    },
  ]);
}
