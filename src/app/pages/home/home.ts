import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChildren('trailImage') private readonly trailImages?: QueryList<ElementRef<HTMLImageElement>>;

  private imageIndex = 0;
  private mousePos: Point = { x: 0, y: 0 };
  private lastMousePos: Point = { x: 0, y: 0 };
  private cachedMousePos: Point = { x: 0, y: 0 };
  private readonly trailGap = 110;
  private cleanupMouseListener?: () => void;
  private readonly imageTrailTicker = () => this.runImageTrail();

  protected readonly flairImages = signal<string[]>([
    'assets/flair/flair-star.png',
    'assets/flair/flair-cross.png',
    'assets/flair/flair-circle.png',
    'assets/flair/flair-flower.png',
    'assets/flair/flair-smile.png',
    'assets/flair/flair-heart.png',
    'assets/flair/flair-arrow.png',
    'assets/flair/flair-zigzag.png',
    'assets/flair/flair-star.png',
    'assets/flair/flair-cross.png',
    'assets/flair/flair-circle.png',
    'assets/flair/flair-flower.png',
    'assets/flair/flair-smile.png',
    'assets/flair/flair-heart.png',
    'assets/flair/flair-arrow.png',
    'assets/flair/flair-zigzag.png',
  ]);

  protected readonly marqueeItems = signal<string[]>([
    'Angular', 'TypeScript', 'Node.js', 'Python',
    'PostgreSQL', 'Docker', 'SCSS', 'Firebase',
    'GraphQL',
  ]);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const win = this.document.defaultView;
    if (!win?.requestAnimationFrame) {
      return;
    }

    const updateMousePosition = (event: Event) => {
      if (!('clientX' in event) || !('clientY' in event)) {
        return;
      }

      const pointerEvent = event as MouseEvent;
      this.mousePos = { x: pointerEvent.clientX, y: pointerEvent.clientY };
    };

    this.document.addEventListener('mousemove', updateMousePosition, { passive: true });
    this.document.addEventListener('pointermove', updateMousePosition, { passive: true });
    win.addEventListener('mousemove', updateMousePosition, { passive: true });
    win.addEventListener('pointermove', updateMousePosition, { passive: true });
    win.addEventListener('pointerrawupdate', updateMousePosition, { passive: true });
    this.cleanupMouseListener = () => {
      this.document.removeEventListener('mousemove', updateMousePosition);
      this.document.removeEventListener('pointermove', updateMousePosition);
      win.removeEventListener('mousemove', updateMousePosition);
      win.removeEventListener('pointermove', updateMousePosition);
      win.removeEventListener('pointerrawupdate', updateMousePosition);
    };
    gsap.ticker.add(this.imageTrailTicker);
  }

  ngOnDestroy(): void {
    this.cleanupMouseListener?.();
    gsap.ticker.remove(this.imageTrailTicker);
  }

  protected scrollTo(sectionId: string): void {
    const el = this.document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private runImageTrail(): void {
    const travelDistance = Math.hypot(
      this.lastMousePos.x - this.mousePos.x,
      this.lastMousePos.y - this.mousePos.y,
    );

    this.cachedMousePos = {
      x: this.interpolate(this.cachedMousePos.x || this.mousePos.x, this.mousePos.x, 0.1),
      y: this.interpolate(this.cachedMousePos.y || this.mousePos.y, this.mousePos.y, 0.1),
    };

    if (travelDistance > this.trailGap) {
      this.animateTrailImage();
      this.lastMousePos = { ...this.mousePos };
    }
  }

  private animateTrailImage(): void {
    const images = this.trailImages?.toArray() ?? [];
    if (!images.length) {
      return;
    }

    const img = images[this.imageIndex % images.length].nativeElement;
    const startX = this.cachedMousePos.x;
    const startY = this.cachedMousePos.y;
    const endX = this.mousePos.x;
    const endY = this.mousePos.y;

    gsap.killTweensOf(img);

    gsap.set(img, {
      opacity: 0,
      x: startX,
      y: startY,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      rotation: this.randomFrom([-180, 180]),
    });

    gsap.timeline({ defaults: { ease: 'expo.out', duration: 1 } })
      .to(img, {
        duration: 0.3,
        opacity: 1,
        scale: 1,
        ease: 'back.out',
        rotation: 0,
      }, 0)
      .to(img, {
        x: endX,
        y: endY,
        xPercent: -50,
        yPercent: -50,
      }, 0)
      .to(img, {
        rotation: this.randomFrom([-600, 600, -300, 300]),
        ease: 'power3.in',
      }, 0.1)
      .to(img, {
        opacity: 0,
        ease: 'power1.in',
        duration: 0.8,
      }, 0.4)
      .to(img, {
        y: '100vh',
        ease: 'power3.inOut',
      }, 0.4);

    this.imageIndex++;
  }

  private interpolate(start: number, end: number, amount: number): number {
    return start + (end - start) * amount;
  }

  private randomFrom(values: number[]): number {
    return values[Math.floor(Math.random() * values.length)];
  }
}
