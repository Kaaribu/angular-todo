import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {UserModel} from "./models/user.model";
import {AuthDataModel} from "./models/auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  // @ts-ignore
  private user: UserModel;

  registerUser(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccess();
  }

  login(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccess();
  }

    logout() {
      // @ts-ignore
      this.user = null;
      this._authSub$.next(false);
      this._router.navigate(['/login']);
    }

    getUser() {
     return { ...this.user };
    }

    isAuth() {
      return this.user != null;
    }

   _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  constructor(private _router: Router) {
  }

  public ngOnDestroy(): void {
    this._authSub$.next(false);
    this._authSub$.complete();
  }

  private authSuccess() {
    this._authSub$.next(true);
    this._router.navigate(['/'])
  }
}


