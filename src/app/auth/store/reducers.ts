import {AuthStateInterface} from "../models/auth.state.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {translateAction} from "./actions";

const initialState: AuthStateInterface = {
  isTranslating: false,
}

const authReducer = createReducer(
  initialState, on(translateAction, (state): AuthStateInterface => ({
...state, isTranslating: true
  })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}


