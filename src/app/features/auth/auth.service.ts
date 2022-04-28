import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { updateProfile } from '@firebase/auth';
import { BehaviorSubject, forkJoin, from, Observable, of, switchMap } from 'rxjs';
import { SigninCredentials, SignupCredentials } from './auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<Object | null>(null);
  
  readonly isLoggedIn$ = authState(this.auth);

  constructor(private auth: Auth, private http: HttpClient) { }

  signIn({ email, password }: SigninCredentials) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => forkJoin([
        updateProfile(user, { displayName }),
        this.http.post(
          `${environment.apiUrl}/createStreamUser`, 
          { user: {...user, displayName } })
      ])),
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
