import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ShaderBackground } from '../../shared/components/shader-background/shader-background';

@Component({
  selector: 'app-home',
  imports: [ShaderBackground],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly document = inject(DOCUMENT);

  protected readonly marqueeItems = signal<string[]>([
    'IONIC',
    'ANGULAR',
    'TYPESCRIPT',
    'SCSS',
    'SIGNALS',
    'RXJS',
    'REACT',
    'FLUTTER',
    'NODE.JS',
    'EXPRESS',
    'SUPABASE',
    'POSTGRESQL',
    'SQL SERVER',
    'REST API',
    'OPENAI API',
    'AWS SES',
    'PYTHON',
    'FIREBASE',
    'GIT',
    'GITHUB',
    'AZURE DEVOPS',
    'FIGMA',
    'VERCEL',
    'RAILWAY',
    'DOCKER',
    'POSTMAN',
    'LINUX',
    'OLLAMA',
    'HOSTINGER VPS',
  ]);

  protected scrollTo(sectionId: string): void {
    const el = this.document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
