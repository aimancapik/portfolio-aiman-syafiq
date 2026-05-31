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
  private readonly whatsappNumber = '60195308755';
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

    const { name, email, message } = this.contactForm.getRawValue();
    const whatsappMessage = [
      `Hi Aiman, I'm ${name}.`,
      '',
      `Email: ${email}`,
      '',
      message,
    ].join('\n');
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    globalThis.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    this.formState.set('success');
    this.contactForm.reset();

    setTimeout(() => {
      this.formState.set('idle');
    }, 1500);
  }
}
