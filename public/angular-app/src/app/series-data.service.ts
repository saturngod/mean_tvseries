import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Episode, Series } from './models/series';
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

  searchSeries(query: string): Observable<[Series]> {
    return this._http.get<[Series]>(this._baseUrl + "?q=" + query + "&count=20");
  }


  getSeries(seriesId: string,lessData: boolean): Observable<Series> {
    if(lessData) {
      return this._http.get<Series>(this._baseUrl + "/" + seriesId + "?less=1");
    }
    return this._http.get<Series>(this._baseUrl + "/" + seriesId);
  }

  getPageInfo(page: number): Observable<PageInfo> {
    return this._http.get<PageInfo>(this._baseUrl + "/pages?page=" + page);
  }

  updateSeries(series: Series,seriesId: string): Observable<Series> {
    return this._http.patch<Series>(this._baseUrl + "/" + seriesId,series.toJSON());
  }

  public delete(seriesId: string) {
    return this._http.delete<Series>(this._baseUrl + "/" + seriesId);
  }

  public deleteEpisode(seriesId: string,seasonId: number,episodeId: number): Observable<Series> {
    return this._http.delete<Series>(this._baseUrl + "/" + seriesId + "/seasons/" + seasonId + "/episodes/" + episodeId);
  }

  public updateEpisode(seriesId: string,seasonId: number,episodeId: number,episode: Episode): Observable<Series> {
    return this._http.patch<Series>(this._baseUrl + "/" + seriesId + "/seasons/" + seasonId + "/episodes/" + episodeId + "/edit",episode.toJSON());
  }
}
