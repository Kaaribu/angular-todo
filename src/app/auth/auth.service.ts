import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {UserInterface} from "./models/userInterface";
import {AuthDataInterface} from "./models/auth-data.interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private user!: UserInterface;

  constructor(private _router: Router,
              private fireAuth: AngularFireAuth,
              private snackbar: MatSnackBar) {
  }

  registerUser(authData: AuthDataInterface) {
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password).
    then((res: any) => {
      this.authSuccess();
    })
      .catch((err: any) => {
        // @ts-ignore
        this.snackbar.open(err.message, null,{
          duration: 3000
        })
      });
  }

  login(authData: AuthDataInterface) {
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

  public ngOnDestroy(): void {
    this._authSub$.next(false);
    this._authSub$.complete();
  }

  private authSuccess() {
    this._authSub$.next(true);
    this._router.navigate(['/'])
  }
}


