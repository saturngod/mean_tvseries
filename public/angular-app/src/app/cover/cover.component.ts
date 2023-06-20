import { Component, Input } from '@angular/core';
import { Series } from '../models/series';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent {

  @Input()
  series: Series = new Series();
  
  

}
