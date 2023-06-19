import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.css']
})
export class StartRatingComponent {

  stars!:number[];

  @Input()
  set rate(value: number) { this.stars = new Array(value);}



}
