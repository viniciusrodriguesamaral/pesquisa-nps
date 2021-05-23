import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-adm-template',
  templateUrl: './adm-template.component.html',
  styleUrls: ['./adm-template.component.css']
})
export class AdmTemplateComponent implements OnInit {

  @Input() title: string;
  @Input() breadcrumbs: string[];
  @Input() back: string;
  homeState = 'in';
  constructor() { }

  ngOnInit(): void {
  }

}
