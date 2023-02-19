import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  translateForm !: FormGroup;

  constructor(private formBuilder: FormBuilder,
               private translate: TranslateService) {

    translate.setDefaultLang('en');
    translate.use('en');
    translate.getBrowserLang();
    translate.getBrowserCultureLang();
  }

  ngOnInit(): void {
    this.translateForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  useLanguage(language: string) : void {
    this.translate.use(language);
  }
}
