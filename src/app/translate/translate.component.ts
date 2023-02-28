import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {isTranslatingSelector} from "../auth/store/selectors";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {translateAction} from "../auth/store/actions";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  translateForm !: FormGroup;
  private isTranslating$: Observable<boolean>;
  constructor(private formBuilder: FormBuilder,
               private translate: TranslateService,
               private store: Store) {

    translate.setDefaultLang('en');
    translate.use('en');
    translate.getBrowserLang();
    translate.getBrowserCultureLang();
  }

   initializeValues(): void {
    this.isTranslating$ = this.store.pipe(select(isTranslatingSelector))
  }

  ngOnInit(): void {
    this.initializeValues()
    this.translateForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  useLanguage(language: string) : void {
    console.log('submit', this.translateForm.value, this.translateForm.valid)
    this.store.dispatch(translateAction(this.translateForm.value))
    this.translate.use(language);
    localStorage.setItem('language', language)
  }
}
