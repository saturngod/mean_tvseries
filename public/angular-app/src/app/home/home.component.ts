import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeriesDataService } from '../series-data.service';
import { Series } from '../models/series';
import { PageInfo } from '../models/page-info';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  series: Series[] = [];
  currentpage = 1;
  

  pageInfo: PageInfo = new PageInfo();

  
  constructor(private _seriesDataService: SeriesDataService,private _activatedRoute: ActivatedRoute) {
    _activatedRoute.params.subscribe({
      next: () => this._loadPageData()
    });
  }

  _getPageNumber(): number {
    let pageNo = parseInt(this._activatedRoute.snapshot.params["pageNo"]);
    if (isNaN(pageNo)) {
      pageNo = 1;
    }
    else if(pageNo <= 0) {
      pageNo = 1;
    }
    
    return pageNo;
  }

  ngOnInit(): void {
    this._loadPageData()
  }

  _fillUpInfo(info: PageInfo) {
    return new Promise((resolve,reject) => {
        this.pageInfo = info;
        resolve(info);
    })
    
  }

  _loadPageData() {
    this.currentpage = this._getPageNumber();
    this._loadPageInfo()
    .then((info: PageInfo) => this._fillUpInfo(info))
    .then(() => this._loadSeries())
  }


  _loadSeries() {
    
    this._seriesDataService.getAllSeries(this.currentpage)
    .subscribe({
      next: (series: Series[]) => {
        this.series = series;
      }
    });

  }

  _loadPageInfo() {
    return new Promise<PageInfo>((resolve,reject) => {
      this._seriesDataService.getPageInfo(this.currentpage)
    .subscribe({
      next: (info: PageInfo) => resolve(info)
    });
    })
    
  }

 


}
