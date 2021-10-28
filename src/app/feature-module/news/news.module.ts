import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import {NewsRoutingModule} from './news-routing.module';
import {ShareModule} from '../../share-module/share.module';



@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    ShareModule
  ]
})
export class NewsModule { }
