import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticateModel } from '../data-models/authenticate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(authenticate: AuthenticateModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/auth/login',
      authenticate
    );
  }
}
