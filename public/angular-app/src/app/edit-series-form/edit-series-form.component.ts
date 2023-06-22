import { Component, OnInit } from '@angular/core';
import { Series } from '../models/series';
import { SeriesDataService } from '../series-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-series-form',
  templateUrl: './edit-series-form.component.html',
  styleUrls: ['./edit-series-form.component.css']
})
export class EditSeriesFormComponent implements OnInit {

  series: Series = new Series();
  seriesId: string = "";

  seriesForm!: FormGroup;
  imageLink: string= "";
  errorMessage: string= "";


  constructor(
    private formBuilder: FormBuilder,
    private seriesDataService: SeriesDataService,
    private activatedRoute: ActivatedRoute,
    private _router: Router) { }

  _fillSeries(series: Series) {
    this.series = series;
  }

  _setupForm(series:Series) {
    this.imageLink = series.poster;
    this.seriesForm.patchValue({
      title: series.title,
      first_air_date: series.first_air_date,
      description: series.description,
      origin_country: series.origin_country,
      rate: series.rate,
      poster: series.poster
    });
  }

  posterBlur() {
    this.imageLink = this.seriesForm.value.poster;
  }

  _initEmptyFormGroup() {
    this.seriesForm= this.formBuilder.group({
      title: ["",Validators.required],
      first_air_date: ["",[
        Validators.required,
        Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
    ]],
      description: ["",Validators.required],
      origin_country: ["",Validators.required],
      rate: [1,Validators.required],
      poster:["",Validators.required]
    });
  }
  ngOnInit(): void {
    this._initEmptyFormGroup();
    this.seriesId = this.activatedRoute.snapshot.params["seriesId"];
    this.seriesDataService.getSeries(this.seriesId, true).subscribe({
      next: (series) => {
        this._fillSeries(series);
        this._setupForm(series);
      }
    });
  }

  cancelUpdate() {
    this._router.navigate(["series",this.seriesId]);
  }

  onSubmit() {
    this.errorMessage = "";

    let updateSeries= new Series();
    updateSeries.fillFromForm(this.seriesForm);
    this.seriesDataService.updateSeries(updateSeries,this.seriesId).subscribe(
      {
        next:() => {
          this._router.navigate(["series",this.seriesId]);
        },
        error:(err) => {
          this.errorMessage= err;
        }
      }
    )
  }
}
