import { Action } from '@ngrx/store';
import { Suggestion } from 'src/app/state/models/suggestion.model';

export const ADD_SUGGESTIONS = '[SUGGESTION LOADED]';

export class AddSuggestions implements Action {
  readonly type = ADD_SUGGESTIONS;

  constructor(public payload: Suggestion[]) {
  }
}


export type Actions = AddSuggestions;
