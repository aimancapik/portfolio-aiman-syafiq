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
      title: 'LepakSpot',
      description:
        'A vibrant discovery landing page for cafes, study spots, and chill hangouts with a bold now-trending hero and card-driven browsing.',
      image: 'assets/projects/lepakspot-screen.png',
      screens: [
        'assets/projects/lepakspot/Screenshot 2026-05-31 080221.png',
        'assets/projects/lepakspot/Screenshot 2026-05-31 080244.png',
        'assets/projects/lepakspot/Screenshot 2026-05-31 080302.png',
        'assets/projects/lepakspot/Screenshot 2026-05-31 080315.png',
        'assets/projects/lepakspot/Screenshot 2026-05-31 080406.png',
      ],
      tags: ['Angular', 'Supabase', 'Cafes'],
      liveUrl: 'https://lepakspot.vercel.app/',
      codeUrl: '#',
      accentColor: 'yellow',
    },
    {
      title: 'TableTap',
      description:
        'A QR table-ordering prototype where guests browse a table-specific menu, manage a local cart, and submit a mock order.',
      image: 'assets/projects/tabletap-screen.png',
      screens: [
        'assets/projects/tabletap/Screenshot 2026-05-31 080506.png',
        'assets/projects/tabletap/Screenshot 2026-05-31 080515.png',
        'assets/projects/tabletap/Screenshot 2026-05-31 080524.png',
        'assets/projects/tabletap/Screenshot 2026-05-31 080536.png',
        'assets/projects/tabletap/Screenshot 2026-05-31 080601.png',
      ],
      tags: ['Angular', 'QR Menu', 'Local Cart'],
      liveUrl: 'https://table-tap-food-order.vercel.app/menu/table/T12',
      codeUrl: '#',
      accentColor: 'green',
    },
    {
      title: "What's Cookin",
      description:
        'A mobile recipe companion for finding meal ideas from pantry ingredients, saving recipes, and browsing short cooking bites.',
      image: 'assets/projects/whatscookin-screen.png',
      screens: [
        'assets/projects/whatscookin/Screenshot 2026-05-31 083409.png',
        'assets/projects/whatscookin/Screenshot 2026-05-31 081513.png',
        'assets/projects/whatscookin/Screenshot 2026-05-31 081536.png',
        'assets/projects/whatscookin/Screenshot 2026-05-31 081548.png',
        'assets/projects/whatscookin/Screenshot 2026-05-31 081555.png',
        'assets/projects/whatscookin/Screenshot 2026-05-31 081614.png',
        'assets/projects/whatscookin/Screenshot 2026-05-31 081619.png',
      ],
      tags: ['Angular', 'Recipes', 'Pantry'],
      liveUrl: 'https://let-em-cook-da-recipe.vercel.app/',
      codeUrl: '#',
      accentColor: 'orange',
    },
  ]);
}

