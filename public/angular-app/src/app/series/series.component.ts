import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Season, Series } from '../models/series';
import { SeriesDataService } from '../series-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  series: Series = new Series();
  seriesId: string = "";
  selectedSeason: Season = new Season();

  get categories() { 
    if(this.series.genres) {
      return this.series?.genres.join(",") ?? "";
    }
    else {
      return "";
    }
  }

  constructor(private seriesDataService: SeriesDataService, 
    private activatedRoute: ActivatedRoute,
    private _router: Router) {}

  getEpisodeImage(imageLink: string) {
    if(imageLink != "") {
      return imageLink;
    }
    else {
      return environment.noEpisodeImage;
    }
  }
  
  activeList(seasonName: string) {
    return seasonName == this.selectedSeason.name;
  }
  ngOnInit(): void {
    this.seriesId =  this.activatedRoute.snapshot.params["seriesId"];
    this.seriesDataService.getSeries(this.seriesId).subscribe({
      next: (series) => {
        this.series = series;
        this.selectedSeason = series.seasons[0];
      }
    })
  }

  changeSeason(season: Season) {
    this.selectedSeason = season;
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
