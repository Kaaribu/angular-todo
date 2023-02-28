import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {filter, Subject, Subscription, take, takeUntil} from 'rxjs';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import {registerAction} from "../store/actions";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  title: string = 'Register'

  registerForm !: FormGroup;
  public loginValid = true;
  public username = '';
  public password = '';

  private _destroySub$ = new Subject<void>();
  private readonly returnUrl: string;
  public isAuthenticated = false;

  constructor(
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private store: Store
  ) {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }
  isAuth = false;
  authSubscription: Subscription | undefined;

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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

  public onSubmit(registerForm: NgForm) {
    console.log('submit', this.registerForm.value, this.registerForm.valid)
    this.store.dispatch(registerAction(this.registerForm.value));
    this._authService.registerUser({
      email: registerForm.value.email,
      password: registerForm.value.password
    });
  }
}
