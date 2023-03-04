import { Injectable, OnDestroy } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Router } from '@angular/router';
import {UserInterface} from "./models/userInterface";
import {AuthDataInterface} from "./models/auth-data.interface";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthService implements OnDestroy {

  authSub$ = new Subject<boolean>();
  private isAuthenticated = false;

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
        this.snackbar.open(err.message, null,{
          duration: 3000
        })
      });
  }

  login(authData: AuthDataInterface) {
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password).
    then((res: any) => {
      this.authSuccess();
    })
      .catch((err: any) => {
        this.snackbar.open(err.message, null,{
          duration: 3000
        })
      });
  }

    logout() {
      this._authSub$.next(false);
      this._router.navigate(['/login']);
      this.isAuthenticated = false;
    }

    isAuth() {
      return this.isAuthenticated;
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
    this.isAuthenticated = true;
    this._authSub$.next(true);
    this._router.navigate(['/'])
  }
}


