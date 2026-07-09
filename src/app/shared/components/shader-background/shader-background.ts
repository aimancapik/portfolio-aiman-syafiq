import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const vertexShader = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

float softCircle(vec2 uv, vec2 center, float radius, float softness) {
  float d = distance(uv, center);
  return 1.0 - smoothstep(radius, radius + softness, d);
}

void main() {
  vec2 uv = v_uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float t = u_time * 0.12;
  float wave =
    sin((p.x * 3.2 + t) * 3.14159) *
    cos((p.y * 2.6 - t * 1.4) * 3.14159);

  vec2 driftA = vec2(0.28 + 0.05 * sin(t * 1.9), 0.32 + 0.04 * cos(t * 1.3));
  vec2 driftB = vec2(0.72 + 0.04 * cos(t * 1.1), 0.56 + 0.05 * sin(t * 1.7));
  vec2 driftC = vec2(0.52 + 0.03 * sin(t * 1.5), 0.44 + 0.04 * cos(t * 1.8));

  float warm = softCircle(uv + wave * 0.035, driftA, 0.22, 0.26);
  float ink = softCircle(uv - wave * 0.025, driftB, 0.24, 0.32);
  float light = softCircle(uv + vec2(wave * 0.02), driftC, 0.18, 0.24);

  vec3 base = vec3(0.953, 0.945, 0.918);
  vec3 amber = vec3(0.72, 0.39, 0.16);
  vec3 graphite = vec3(0.08, 0.08, 0.08);
  vec3 pearl = vec3(1.0, 0.98, 0.92);

  vec3 color = base;
  color = mix(color, amber, warm * 0.86);
  color = mix(color, graphite, ink * 0.58);
  color = mix(color, pearl, light * 0.34);

  float grain = fract(sin(dot(gl_FragCoord.xy + u_time, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.035;

  float vignette = smoothstep(0.92, 0.18, distance(uv, vec2(0.5)));
  color = mix(base * 0.86, color, vignette);

  gl_FragColor = vec4(color, 1.0);
}
`;

@Component({
  selector: 'app-shader-background',
  imports: [],
  templateUrl: './shader-background.html',
  styleUrl: './shader-background.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShaderBackground implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private readonly canvas?: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private animationFrame = 0;
  private gl?: WebGLRenderingContext;
  private startTime = 0;
  private reducedMotion = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.canvas) {
      return;
    }

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.startTime = performance.now();
    this.initWebgl(this.canvas.nativeElement);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }

  private initWebgl(canvas: HTMLCanvasElement): void {
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      return;
    }

    this.gl = gl;

    const program = this.createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'a_position');
    const resolution = gl.getUniformLocation(program, 'u_resolution');
    const time = gl.getUniformLocation(program, 'u_time');

    const render = () => {
      this.resize(canvas);
      gl.useProgram(program);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, this.reducedMotion ? 0 : (performance.now() - this.startTime) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!this.reducedMotion) {
        this.animationFrame = window.requestAnimationFrame(render);
      }
    };

    render();
  }

  private resize(canvas: HTMLCanvasElement): void {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio));
    const height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio));

    if (canvas.width === width && canvas.height === height) {
      return;
    }

    canvas.width = width;
    canvas.height = height;
    this.gl?.viewport(0, 0, width, height);
  }

  private createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram | null {
    const vertex = this.createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    if (!vertex || !fragment) {
      return null;
    }

    const program = gl.createProgram();
    if (!program) {
      return null;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
  }

  private createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) {
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  }
}
