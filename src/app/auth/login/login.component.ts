import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {filter, Subject, Subscription, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  title: string = 'Login'

  loginForm !: FormGroup;
  public loginValid = true;
  public email = '';
  public password = '';

  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;
  public isAuthenticated = false;
  public logout(): void {
    // todo
  }

  isAuth = false;
  authSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }


  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.authSubscription = this._authService._authSub$.subscribe( authStatus => {
      this.isAuth = authStatus;
    } );
  }

  onLogout() {
    this._authService.logout()
  }


  public ngOnDestroy() {
    // @ts-ignore
    this.authSubscription.unsubscribe();
  }

  public onSubmit(loginForm: FormGroup) {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
