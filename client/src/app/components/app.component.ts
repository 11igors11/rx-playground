import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flatMap, map, pluck, retry, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';
import { SearchService } from '../services/search.service';
import { TreeService } from '../services/tree.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Suggestion } from 'src/app/state/models/suggestion.model';
import { AddSuggestions } from 'src/app/state/actions/suggestion.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(`input`) inputRef: ElementRef;
  @ViewChild(`text`) textRef: ElementRef;

  private suggestions: Observable<string>;

  constructor(private httpClient: HttpClient,
              private searchService: SearchService,
              private treeService: TreeService,
              private store: Store<AppState>) {
    this.suggestions = this.store.select('suggestions')
      .pipe(map((suggesions: Suggestion[]) => suggesions.map(s => s.name).join(`\n`)));
  }

  ngAfterViewInit(): void {


    // search

    const input$ = fromEvent(this.inputRef.nativeElement, `input`);

    input$
      .pipe(
        pluck(`target`, `value`),
        switchMap((v: string) => this.getRequest(v)))
      .subscribe(result => {
        const suggestions = result.map(r => {
          return {
            name: r,
            length: r.length
          }
        });
        this.store.dispatch(new AddSuggestions(suggestions));
      });


    // drag & drop

    const el = document.getElementById(`square`);
    const mousedown$ = fromEvent(el, `mousedown`);
    const mouseup$ = fromEvent(document, `mouseup`);
    const mousemove$ = fromEvent(document, `mousemove`);

    mousedown$
      .pipe(flatMap((md: MouseEvent) => {

          const startX = md.offsetX;
          const startY = md.offsetY;

          return mousemove$
            .pipe(
              map((mm: MouseEvent) => {
                mm.preventDefault();
                return {
                  left: mm.clientX - startX,
                  top: mm.clientY - startY
                };
              }),
              takeUntil(mouseup$)
            );
        }),
      )
      .subscribe(pos => {
        el.style.top = pos.top + `px`;
        el.style.left = pos.left + `px`;
      });


    // search
    this.searchService.run();


    // tree traversal
    this.treeService.run();

  }


  private getRequest(term: string): Observable<any> {
    return this.httpClient.get(`/api/searchresult`, {
      params: { term },
    }).pipe(retry(20));
  }

  // search algorithms


}
