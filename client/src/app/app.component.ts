import { AfterViewInit, ApplicationRef, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flatMap, map, pluck, retry, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(`input`) inputRef: ElementRef;
  @ViewChild(`text`) textRef: ElementRef;

  constructor(private httpClient: HttpClient) {
  }

  ngAfterViewInit(): void {

    // search

    const input$ = fromEvent(this.inputRef.nativeElement, `input`);

    input$
      .pipe(
        pluck(`target`, `value`),
        switchMap((v: string) => this.getRequest(v)))
      .subscribe(result => {
        this.textRef.nativeElement.textContent = result.join(`\n`);
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

  }


  private getRequest(term: string): Observable<any> {
    return this.httpClient.get(`/api/searchresult`, {
      params: { term },
    }).pipe(retry(20));
  }
}
