import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private counter = 0;

  public startLoading(request: Observable<any>): Observable<any> {
    this.increment();
    return request.pipe(finalize(() => this.decrement()));
  }
  constructor(private httpClient: HttpClient) {}

  private increment(): void {
    this.counter++;
    this.isLoading$.next(true);
  }

  private decrement(): void {
    this.counter--;
    if (!this.counter) {
      this.isLoading$.next(false);
    }

  }
}
