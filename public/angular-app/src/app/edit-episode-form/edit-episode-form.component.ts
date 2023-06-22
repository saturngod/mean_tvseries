import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { SeriesDataService } from '../series-data.service';
import { Episode, Series } from '../models/series';

@Component({
  selector: 'app-edit-episode-form',
  templateUrl: './edit-episode-form.component.html',
  styleUrls: ['./edit-episode-form.component.css']
})
export class EditEpisodesFormComponent implements OnInit {

  episodeForm!: FormGroup;
  seriesId: string = "";
  seasonIndex: number = 0;
  episodeIndex: number = 0;
  series: Series = new Series();
  get imageLink() { return this.episodeForm.value.image; }

  errorMessage: string= "";


  constructor(
    private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private seriesDataService: SeriesDataService,
  ) { }

  onSubmit() {
    let updateEpisode = new Episode();
    updateEpisode.episode_number = this.episodeForm.value.episode_number;
    updateEpisode.name = this.episodeForm.value.name;
    updateEpisode.overview = this.episodeForm.value.overview;
    updateEpisode.image = this.episodeForm.value.image;
    this.seriesDataService.updateEpisode(this.seriesId,this.seasonIndex,this.episodeIndex,updateEpisode).subscribe({
      next: () => {
        this.router.navigate(["series",this.seriesId]);
      }
    });

  }


  _initEmptyFormGroup() {
    this.episodeForm= this.formBuilder.group({
      episode_number: [1,Validators.required],
      name: ["",Validators.required],
      overview: ["",Validators.required],
      image: ["",Validators.required],
    });
  }

  _initParams() {
    this.seriesId =  this.activedRoute.snapshot.params["seriesId"];
    this.seasonIndex = this.activedRoute.snapshot.params["seasonIndex"];
    this.episodeIndex = this.activedRoute.snapshot.params["episodeIndex"];
  }

  _setupSeriesForm(series: Series) {
      this.series = series;
      this.episodeForm.patchValue({
        episode_number: series.seasons[this.seasonIndex].episodes[this.episodeIndex].episode_number,
        name: series.seasons[this.seasonIndex].episodes[this.episodeIndex].name,
        overview: series.seasons[this.seasonIndex].episodes[this.episodeIndex].overview,
        image: series.seasons[this.seasonIndex].episodes[this.episodeIndex].image,
      });
    
  }
  _loadSeries() {
    this.seriesDataService.getSeries(this.seriesId,false).subscribe({
      next: (series) => this._setupSeriesForm(series)
    })
  }

  cancelUpdate() {
    this.router.navigate(["series",this.seriesId]);
  }

  ngOnInit(): void {
    this._initParams();
    this._initEmptyFormGroup();
    this._loadSeries();
  }



}
