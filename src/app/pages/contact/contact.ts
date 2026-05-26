import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type FormState = 'idle' | 'sending' | 'success';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly fb = inject(FormBuilder);

  protected readonly formState = signal<FormState>('idle');

  protected readonly contactForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.formState.set('sending');

    // Simulate network request
    setTimeout(() => {
      this.formState.set('success');
      this.contactForm.reset();

      // Reset to idle after 5 seconds
      setTimeout(() => {
        this.formState.set('idle');
      }, 5000);
    }, 1500);
  }
}
