import { createAction, props } from '@ngrx/store';
import {ActionTypes} from "./actionTypes";
import { TranslateRequestInterface } from '../models/translateRequest.interface';

export const translateAction = createAction(
  ActionTypes.TRANSLATE,
  props<{ request: TranslateRequestInterface }>()
);
