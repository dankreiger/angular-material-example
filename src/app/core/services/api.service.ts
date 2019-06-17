import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CoreModule } from '../core.module';

@Injectable({ providedIn: CoreModule })
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  private formattedPath(path: string): string {
    if (path && path[0] !== '/') {
      return `/${path}`;
    }
    return path;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${this.formattedPath(path)}`, { params })
      .pipe(catchError(this.formatErrors));
  }
}
