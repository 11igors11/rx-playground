import { Suggestion } from 'src/app/state/models/suggestion.model';

export interface AppState {
  readonly suggestions: Suggestion[];
}
