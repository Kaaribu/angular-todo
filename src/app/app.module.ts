import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from '@angular/material/sort';
import { TodosComponent } from './todos/todos.component';
import { ServicesComponent } from './services/services.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TranslateComponent } from './translate/translate.component';
import {TranslateLoader, TranslateModule, TranslateCompiler} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';
import {MatCardModule} from "@angular/material/card";
import { LoginComponent } from './auth/login/login.component';
import {AuthService} from "./auth/auth.service";
import { AngularFireModule} from "@angular/fire/compat";
import { AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { environment} from "./environments/environment";
import { AngularFireAuthModule} from "@angular/fire/compat/auth";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StoreModule} from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RegisterComponent} from "./auth/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TodosComponent,
    ServicesComponent,
    TranslateComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatToolbarModule, MatIconModule,
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatRadioModule, MatSelectModule, ReactiveFormsModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatCheckboxModule, AngularFireModule.initializeApp(environment.firebase,
      'angular-todo'), AngularFirestoreModule, AngularFireAuthModule, MatSnackBarModule,
    StoreModule.forRoot({}), StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },

      // compiler configuration
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }), MatCardModule, FormsModule, StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
