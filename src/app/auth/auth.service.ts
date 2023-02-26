import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  constructor(private _router: Router) {
  }

  public ngOnDestroy(): void {
    this._authSub$.next(false);
    this._authSub$.complete();
  }
}


