import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Season, Series } from '../models/series';
import { SeriesDataService } from '../series-data.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  series: Series = new Series();
  seriesId: string = "";
  selectedSeason: Season = new Season();

  selectedSeasonIndex: number = 0;


  get isLogin() { return this.authService.isLogin; }

  get categories() { 
    if(this.series.genres) {
      return this.series?.genres.join(",") ?? "";
    }
    else {
      return "";
    }
  }

  constructor(private seriesDataService: SeriesDataService, 
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private _router: Router) {}

  
  
  activeList(seasonName: string) {
    return seasonName == this.selectedSeason.name;
  }
  ngOnInit(): void {
    this.seriesId =  this.activatedRoute.snapshot.params["seriesId"];
    this._loadSeries();
  }

  _loadSeries() {
    this.seriesDataService.getSeries(this.seriesId,false).subscribe({
      next: (series) => {
        this.series = series;
        this.selectedSeason = series.seasons[this.selectedSeasonIndex];
      }
    })
  }

  episodeDelete(series: Series) {
    this._loadSeries();
  }

  changeSeason(season: Season) {
    this.selectedSeason = season;
    this.selectedSeasonIndex = this.series.seasons.indexOf(season);
  }

  confirmDelete() {
    this.seriesDataService.delete(this.seriesId).subscribe(
      {
        next:() => {
          this._router.navigate([""]);
        }
      }
    )
    
  }



}
