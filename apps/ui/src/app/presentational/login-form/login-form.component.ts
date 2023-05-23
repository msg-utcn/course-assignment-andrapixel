import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { AuthenticateModel } from '../../data-models/authenticate.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'course-project-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements DoCheck {
  @Output() submit = new EventEmitter<AuthenticateModel>();

  /*login(authenticate: AuthenticateModel): void {
    this.submit.emit(authenticate);
  }*/

  ngDoCheck() {
    console.log('login form check!');
  }

  // reactive form
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.submit.emit({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    } as AuthenticateModel);
  }
}
