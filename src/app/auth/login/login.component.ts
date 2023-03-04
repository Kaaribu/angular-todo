import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  title: string = 'Login'

  loginForm : FormGroup;
  public loginValid = true;
  public email = '';
  public password = '';

  private readonly returnUrl: string;

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
    this.loginForm = new FormGroup({
      email: new FormControl('',
        {validators: [Validators.required, Validators.email]}),
      password: new FormControl('',
        {validators: [Validators.required]}),
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

  public onSubmit() {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
