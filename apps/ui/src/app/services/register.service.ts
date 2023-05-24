import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from '../data-models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(registerModel: RegisterModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/auth/register',
      registerModel
    );
  }
}
