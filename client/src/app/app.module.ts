import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { TreeService } from './services/tree.service';
import { suggestionsReducer } from 'src/app/state/reducers/suggestion.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      suggestions: suggestionsReducer
    })
  ],
  providers: [SearchService, TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
