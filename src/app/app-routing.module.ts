import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsComponent} from "./feature-module/news/news.component";

const routes: Routes = [

  // {path: '404', component: PageNotFoundComponent},
  // {path: '**' ,redirectTo: '/404'}
  {path: "news",
  component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
