import { Component, OnInit } from '@angular/core';
import {INews} from "../../../core-module/news/INews";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {INewsType} from "../../../core-module/news/INewsType";
import {ActivatedRoute, Router} from "@angular/router";
import {NewsService} from "../../../core-module/news/news.service";
import {NewsTypeService} from "../../../core-module/news/news-type.service";
import {SnackbarService} from "../../../core-module/snackbar/snackbar.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {

  news: INews;
  newsForm: FormGroup;
  newsType: INewsType[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private newsService: NewsService,
              private newsTypeService: NewsTypeService,
              private snackBar: SnackbarService,
              private httpClient: HttpClient) {
    this.newsForm = new FormGroup({
        newsTitle: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100)])),
        newsBrief: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(256)])),
        newsContent: new FormControl('', Validators.compose([Validators.required, Validators.minLength(100), Validators.maxLength(1024)])),
        imageUrl: new FormControl('', Validators.compose([Validators.required])),
        type: new FormControl('', Validators.compose([Validators.required])),
      }
    );
  }

  validationMessage = {
    newsTitle: [
      {type: 'required', message: 'Vui lòng nhập tiêu đề của tin tức.'},
      {type: 'minlength', message: 'Độ dài bắt buộc: 10 đến 100 ký tự.'},
      {type: 'maxlength', message: 'Độ dài bắt buộc: 10 đến 100 ký tự.'},
    ],
    newsBrief: [
      {type: 'required', message: 'Vui lòng nhập tóm tắt của tin tức.'},
      {type: 'minlength', message: 'Độ dài bắt buộc: 10 đến 256 ký tự.'},
      {type: 'maxlength', message: 'Độ dài bắt buộc: 10 đến 256 ký tự.'},
    ],
    newsContent: [
      {type: 'required', message: 'Vui lòng nhập nội dung của tin tức.'},
      {type: 'minlength', message: 'Độ dài bắt buộc: 100 - 1024 ký tự.'},
      {type: 'maxlength', message: 'Độ dài bắt buộc: 100 - 1024 ký tự.'},
    ],
    imageUrl: [
      {type: 'required', message: 'Vui lòng nhập đường dẫn ảnh.'},
    ],
    type: [
      {type: 'required', message: 'Vui lòng chọn thể loại tin.'},
    ]
  };


  ngOnInit(): void {
    this.getType();
    console.log(this.newsType);
  }

  getType() {
    this.newsTypeService.findAll().subscribe(data => {
      this.newsType = data;
    });
  }

  createNews() {
    if (this.newsForm.valid) {
      this.newsService.createNews(this.newsForm.value).subscribe(next => {
        this.snackBar.showSnackbar('Tạo thành công.', 'success'
        );
      });
      this.router.navigateByUrl('/news/list');
    }
  }

}
