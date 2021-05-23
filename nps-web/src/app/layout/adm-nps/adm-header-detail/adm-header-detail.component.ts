import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-adm-header-detail',
  templateUrl: './adm-header-detail.component.html',
  styleUrls: ['./adm-header-detail.component.css']
})
export class AdmHeaderDetailComponent implements OnInit {

  @Input()  title: string;
  @Input()  breadcrumbs: string[];
  constructor() { }

  ngOnInit(): void {
  }

}
