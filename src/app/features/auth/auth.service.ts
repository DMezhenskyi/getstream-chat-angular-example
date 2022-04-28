import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<Object | null>(null);
  
  readonly isLoggedIn$ = this.authState.asObservable();

  constructor() { }

  signIn(credentials: Object) {
    this.authState.next(credentials)
  }

  signUp(user: Object) {
    this.authState.next(user)
  }
}
