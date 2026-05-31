export interface Project {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly screens?: readonly string[];
  readonly tags: readonly string[];
  readonly liveUrl: string;
  readonly codeUrl: string;
  readonly accentColor: string;
}

export interface Stat {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly icon?: string;
}

export interface SkillCategory {
  readonly title: string;
  readonly icon: string;
  readonly color: string;
  readonly rotation: string;
  readonly hoverColor: string;
  readonly skills: readonly string[];
}

export interface SocialLink {
  readonly icon: string;
  readonly url: string;
  readonly color: string;
  readonly label: string;
}
