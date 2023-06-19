import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Series } from './models/series';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { PageInfo } from './models/page-info';

@Injectable({
  providedIn: 'root'
})
export class SeriesDataService {

  _baseUrl: string = "";

  constructor(private _http: HttpClient, private _authService: AuthenticationService) {
    this._baseUrl = environment.baseUrl + "/series";
  }

  getAllSeries(page: number): Observable<[Series]> {
    return this._http.get<[Series]>(this._baseUrl + "?page=" + page);
  }

  getSeries(seriesId: string): Observable<Series> {
    return this._http.get<Series>(this._baseUrl + "/" + seriesId);
  }

  getPageInfo(page: number): Observable<PageInfo> {
    return this._http.get<PageInfo>(this._baseUrl + "/pages?page=" + page);
  }

  public delete(seriesId: string) {
    return this._http.delete<Series>(this._baseUrl + "/" + seriesId, {
      headers: { "Authorization": "Bearer " + this._authService.token }
    });
  }
}
