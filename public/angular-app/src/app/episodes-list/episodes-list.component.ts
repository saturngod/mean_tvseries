import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Episode, Season, Series } from '../models/series';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';
import { SeriesDataService } from '../series-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css']
})
export class EpisodesListComponent {

  @Input()
  seriesId: string = "";
  
  @Input()
  season: Season = new Season();

  @Input()
  seasonIndex: number = 0;

  @Output()
  onDelete: EventEmitter<Series> = new EventEmitter<Series>();

  selectedEpisode: Episode = new Episode();
  selectedIndex: number = -1;

  get isLogin() { return this._authService.isLogin; }

  constructor(
    private _seriesDataService: SeriesDataService,
    private _authService: AuthenticationService,
    private _router: Router
    ) { }
  
  getEpisodeImage(imageLink: string) {
    if(imageLink != "") {
      return imageLink;
    }
    else {
      return environment.noEpisodeImage;
    }
  }

  confirmDelete() {
    this._seriesDataService.deleteEpisode(this.seriesId,this.seasonIndex,this.selectedIndex).subscribe({
      next: (series) => {
        this.onDelete.emit(series);
      }
    });
  }

  _getEditRoute() {
    return ["series",this.seriesId, "season", this.seasonIndex, "episode" , this.selectedIndex , "edit"];
  }

  editEpisode(episodeId: string) {
    this._fillEpisodeId(episodeId);
    const route = this._getEditRoute();
    this._router.navigate(route);
  }

  _fillEpisodeId(episodeId: string) {
    for(let i = 0; i < this.season.episodes.length; i++) {
      if(this.season.episodes[i]._id == episodeId) {
        this.selectedIndex = i;
        break;
      }
    }
  }

  saveDelete(episodeId: string) {
    
    this._fillEpisodeId(episodeId);
    
    this.selectedEpisode = this.season.episodes[this.selectedIndex];
    

  }
}
