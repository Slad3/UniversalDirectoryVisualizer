import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';



@Component({
  selector: 'visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
})
export class VisualizationComponent implements OnInit {
  @Input() data: string;

  fullObject: {};

  constructor() {}

  tempId: string;

  ngOnInit(): void {
    console.log(this.data);

    this.fullObject = JSON.stringify(this.data);
  }

  getItems(files: any) {
    if (Array.isArray(files)) {
      return files;
    }

    let temp = Object.entries(files);
    temp.sort((a, b) => {
      if (this.isNumber(a[1]) && this.isNumber(b[1])) {
        return Number(b[1]) - Number(a[1]);
      }
    });
    return temp;
  }

  isNumber(object: any) {
    return Number.isInteger(object);
  }

  setId(inputObject: string, list: any) {
    let input = inputObject[0];
    if (input === '::files::') {
      this.tempId = 'files' + list[0][1]['size'];
    //   this.tempId = 'files' + list[0][1]['htmlId'];
      return this.tempId;
    }
    input = input.replace(' ', '');
    input = input.replace('\\', '');
    input = input.replace('"', '');
    input = input.replace("'", '');
    this.tempId = input;

    return input;
  }
}
