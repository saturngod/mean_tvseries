import { Component, Input, OnInit } from '@angular/core';
import { PageInfo } from '../models/page-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent{

 
  currentPage: number = 1;
  pagesData: number[] = [];
  _pageInfo: PageInfo = new PageInfo();

  @Input()
  set pageInfo(value: PageInfo) {
    this._pageInfo = value;
    this.pagesData = this._pageData(this.pageInfo.totalPage,this.currentPage);
  }

  get pageInfo() { return this._pageInfo;}

  @Input()
  set page(value:number) {
    this.currentPage = value;
  }

  get isFirstPage() { return this.pageInfo.first; }
  get isLastPage() { return this.pageInfo.last; }

  constructor(private _router: Router) {}

  isActivePage(pageNo:number) {
    return this.currentPage == pageNo;
  }



  _pageData(totalPages: number, currentPage: number): number[] {

    const pagination: number[] = [];

    if(this.pageInfo.totalPage == undefined) {
      return pagination;
    }
    if(this.pageInfo.totalPage < this.currentPage) {
      this._router.navigate(["notfound"])
      return pagination;
    }
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      let startPage = currentPage - 2;
      let endPage = currentPage + 2;

      if (startPage < 1) {
        startPage = 1;
        endPage = 5;
      }

      if (endPage > totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pagination.push(i);
      }
    }

    return pagination;

  }
  

}
