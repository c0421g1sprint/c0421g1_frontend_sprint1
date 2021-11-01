import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./news.component";
import {HomepageBodyComponent} from "./homepage-body/homepage-body.component";
import {NewsListComponent} from "./news-list/news-list.component";
import {NewsCreateComponent} from "./news-create/news-create.component";
import {NewsReadComponent} from "./news-read/news-read.component";


const routes: Routes = [
  {path: 'news', component: NewsComponent,
  children: [
    {path: '', component: HomepageBodyComponent},
    {path: 'list', component: NewsListComponent},
    {path: 'create', component: NewsCreateComponent},
    {path: 'read/:id', component: NewsReadComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
