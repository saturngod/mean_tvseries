import { Component, OnInit } from '@angular/core';
import { Series } from '../models/series';
import { SeriesDataService } from '../series-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  series: Series[] = [];
  query: string = "";

  constructor(private _seriesDataService: SeriesDataService,
    private _activeRoute: ActivatedRoute) {

  }

  _updateQueryValue(query: Params) {
    this.query = query["q"];
    this._seriesDataService.searchSeries(this.query)
    .subscribe({
      next:(result:Series[]) => {
        this.series = result;
      }
    })
  }

  ngOnInit(): void {
    this._activeRoute.queryParams.subscribe({
      next:(value: Params) => this._updateQueryValue(value)
    })
  }
  
}
