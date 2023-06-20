import { Component, OnInit } from '@angular/core';
import { SeriesDataService } from '../series-data.service';
import { Series } from '../models/series';
import { PageInfo } from '../models/page-info';
import { ActivatedRoute } from '@angular/router';

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
    this._loadPageData();
  }

  _loadPageData() {
    this.currentpage = this._getPageNumber();
    this._loadSeries();
    this._loadPageInfo();
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
    this._seriesDataService.getPageInfo(this.currentpage)
    .subscribe({
      next: (info: PageInfo) => {
        this.pageInfo = info;
      }
    });
  }

  prev() {
    if(this.currentpage > 1) {
      this.currentpage = this.currentpage - 1;
      if(this.currentpage == 1) {
        this.pageInfo.first = true;
      }
      else {
        this.pageInfo.first = false;
      }
      this._loadSeries();
    }
  }

  next() {
    let maxPage= this.pageInfo.totalPage;
    if(this.currentpage < maxPage) {
      this.currentpage = this.currentpage + 1;
      if(this.currentpage == maxPage) {
        this.pageInfo.last = true;
      }
      else {
        this.pageInfo.last = false;
      }
      this._loadSeries();
    }
  }


}
