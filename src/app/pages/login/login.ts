import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Input } from '../../shared/components/input/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterOutlet, Input, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  protected readonly title = signal('inventory-system');

  protected form!: FormGroup;

  protected emailField!: any;
  protected passwordField!: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      emailField: [null, [Validators.required, Validators.email]],
      passwordField: [null, [Validators.required]],
    })

    this.emailField = this.form.get("emailField");
    this.passwordField = this.form.get("passwordField");
  }

  protected submit() {
    this.form.markAllAsTouched();

    if(this.form.invalid) return

    const {emailField, passwordField} = this.form.getRawValue();
    console.log(emailField);

    this.router.navigate(['register']);
  }
}
