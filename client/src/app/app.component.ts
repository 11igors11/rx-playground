import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flatMap, pluck, retry, switchMap } from 'rxjs/operators';
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

    const input$ = fromEvent(this.inputRef.nativeElement, `input`);

    input$
      .pipe(
        pluck(`target`, `value`),
        switchMap( (v: string)=> this.getRequest(v)))
      .subscribe(result => {
        this.textRef.nativeElement.textContent = result;
      })
  }


  private getRequest(term: string): Observable<any> {
    return this.httpClient.get(`/api/searchresult`, {
      params: { term },
      responseType: `text`
    }).pipe(retry(20));
  }
}
