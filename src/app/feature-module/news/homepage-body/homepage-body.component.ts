import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage-body',
  templateUrl: './homepage-body.component.html',
  styleUrls: ['./homepage-body.component.css']
})
export class HomepageBodyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigate() {
    this.router.navigateByUrl('/list');
    window.scrollTo(0,0);
  }
}
