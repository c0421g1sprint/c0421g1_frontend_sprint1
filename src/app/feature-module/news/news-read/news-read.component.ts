import { Component, OnInit } from '@angular/core';
import {INews} from "../../../core-module/news/INews";
import {FormControl, FormGroup} from "@angular/forms";
import {NewsService} from "../../../core-module/news/news.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-news-read',
  templateUrl: './news-read.component.html',
  styleUrls: ['./news-read.component.css']
})
export class NewsReadComponent implements OnInit {

  id: number;
  public newsDetail: INews;
  public newsForm: FormGroup;

  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      console.log(this.id)
      this.getNews(this.id);
    });
  }

  getNews(id: number) {
    return this.newsService.findById(id).subscribe(news => {
      this.newsForm = new FormGroup({
        newsId: new FormControl(news.newsId),
        newsTitle: new FormControl(news.newTitle),
        newsBrief: new FormControl(news.newsBrief),
        newsContent: new FormControl(news.newsContent),
        imageUrl: new FormControl(news.imageUrl),
        postDate: new FormControl(news.postDate),
      });
      this.newsDetail = news;
      this.newsDetail.newsTitle = news.newTitle;
      this.newsForm.patchValue(this.newsDetail);
      console.log(this.newsDetail);
    });
  }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigateByUrl('news/list');
    window.scrollTo(0,0);
  }
}
