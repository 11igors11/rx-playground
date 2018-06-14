import { Suggestion } from 'src/app/state/models/suggestion.model';
import * as SuggestionActions from 'src/app/state/actions/suggestion.actions';

const initialState: Suggestion[] = [];

export function suggestionsReducer(state: Suggestion[] = initialState, action: SuggestionActions.Actions) {
  switch (action.type) {
    case SuggestionActions.ADD_SUGGESTIONS:
      return action.payload;
    default:
      return state;
  }
}
