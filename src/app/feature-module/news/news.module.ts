import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import {NewsRoutingModule} from './news-routing.module';
import {ShareModule} from '../../share-module/share.module';
import { HomepageBodyComponent } from './homepage-body/homepage-body.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { NewsReadComponent } from './news-read/news-read.component';

@NgModule({
  declarations: [NewsComponent, HomepageBodyComponent, NewsListComponent, NewsCreateComponent, NewsReadComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    ShareModule
  ]
})
export class NewsModule { }
