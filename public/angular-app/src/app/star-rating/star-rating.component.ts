import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

  stars!:number[];
  nonActive!: number[];
  @Input()
  set rate(value: number) { 
    this.stars = new Array(value);
    this.nonActive =new Array(10 - value);
  }

}
