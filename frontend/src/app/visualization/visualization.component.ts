import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
})
export class VisualizationComponent implements OnInit {
  @Input() data: string;

  fullObject: {};

  constructor(){}

  ngOnInit(): void {
    console.log(this.data);
    this.fullObject = JSON.stringify(this.data);
  }
}
