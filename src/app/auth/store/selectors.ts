import {createSelector} from "@ngrx/store";
import {AppStateInterface} from "../models/appState.interface";
import {AuthStateInterface} from "../models/auth.state.interface";

export const authFeatureSelector = (state: AppStateInterface):
  AuthStateInterface => state.auth

export const isTranslatingSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.isTranslating
)
