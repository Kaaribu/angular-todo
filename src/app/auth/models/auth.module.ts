import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../store/reducers";
import {TranslateComponent} from "../../translate/translate.component";

const routes = []

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers)],
  declarations: [TranslateComponent]
})
export class AuthModule {

}
