import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { RegisterModel } from '../../data-models/register.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'course-project-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements DoCheck {
  @Output() submit = new EventEmitter<RegisterModel>();

  ngDoCheck(): void {
    console.log('register-form check!');
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false, [Validators.required]),
  });

  register() {
    this.submit.emit({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      isAdmin: this.registerForm.value.isAdmin,
    } as RegisterModel);
  }
}
