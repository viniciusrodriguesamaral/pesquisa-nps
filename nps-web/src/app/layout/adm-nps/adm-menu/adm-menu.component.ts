import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-adm-menu',
  templateUrl: './adm-menu.component.html',
  styleUrls: ['./adm-menu.component.css']
})
export class AdmMenuComponent implements OnInit {

  constructor() { }

  @Input()
  routerLinkActiveOptions: {
    exact: boolean;
  }
  ngOnInit(): void {
  }

}
