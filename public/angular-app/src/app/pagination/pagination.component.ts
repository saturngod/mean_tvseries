import { Component, Input, OnInit } from '@angular/core';
import { PageInfo } from '../models/page-info';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  
  pagesData: number[] = [];

  @Input()
  pageInfo: PageInfo = new PageInfo();

  currentPage: number = 1;
  @Input()
  set page(value:number) {
    this.currentPage = value;
    this.pagesData = this._pageData(this.pageInfo.totalPage,this.currentPage);
  }

  

  get isFirstPage() { return this.pageInfo.first; }
  get isLastPage() { return this.pageInfo.last; }

  isActivePage(pageNo:number) {
    return this.currentPage == pageNo;
  }

  _pageData(totalPages: number, currentPage: number): number[] {

    const pagination: number[] = [];

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
