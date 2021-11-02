import { Component, OnInit } from '@angular/core';
import {INewsType} from "../../../core-module/news/INewsType";
import {INews} from "../../../core-module/news/INews";
import {NewsService} from "../../../core-module/news/news.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  newsType: INewsType[];
  newsList: INews[] = [];
  totalPage: number;
  page = 0;
  pageNumberInput: any;


  newsFather: INews;

  constructor(private newsService: NewsService,
              private activatedRoute: ActivatedRoute,
              private matSnackBar: SnackbarService) {
  }

  getAll() {
    this.newsService.findAll(this.page).subscribe(value => {
      // @ts-ignore
      this.newsList = value.content;
      // @ts-ignore
      this.totalPage = value.totalPages;
      console.log(this.newsList);
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  showDetail(news: INews) {
    this.newsFather = news;
  }


  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
    }
    this.ngOnInit();
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
    } else {
      this.page = 0;
    }
    this.ngOnInit();
  }

  lastPage() {
    this.page = this.totalPage - 1;
    this.ngOnInit();
  }

  firstPage() {
    this.page = 0;
    this.ngOnInit();
  }

  searchPage() {
    if (this.pageNumberInput - 1 < this.totalPage && this.pageNumberInput - 1 >= 0) {
      this.page = this.pageNumberInput - 1;
    } else {
      this.matSnackBar.showSnackbar('Nhập sai số!', 'error');
      // this.pageNumberInput = 1;
      // this.getAll();
    }
    this.ngOnInit();
  }
}