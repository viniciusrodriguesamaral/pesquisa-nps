import { Component, OnInit } from '@angular/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading: boolean;
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.notifier
      .subscribe(show => {
        this.loading = show;
      })
  }

}
