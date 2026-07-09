import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { SocialLink } from '../../shared/models/portfolio.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly socialLinks = signal<SocialLink[]>([
    { icon: 'ph-fill ph-linkedin-logo', url: 'https://www.linkedin.com/in/aimansyafiq-/', color: 'pink', label: 'LinkedIn' },
    { icon: 'ph-fill ph-github-logo', url: 'https://github.com/aimancapik', color: 'yellow', label: 'GitHub' },
  ]);
}
