import { createAction, props } from '@ngrx/store';
import {ActionTypes} from "./actionTypes";
import {RegisterRequestInteface} from "../models/registerRequest.inteface";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequestInteface }>()
);
