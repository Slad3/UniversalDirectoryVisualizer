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
      if (!this.getMetaDirectory(list)) {
        this.tempId = 'filesUpper';
      } else {
        this.tempId =this.getMetaDirectory(list)[1]['htmlId'];
        this.tempId = this.tempId.split(".").join("");
      }
      //   this.tempId = 'files' + list[0][1]['htmlId'];

      return this.tempId;
    }
    input = input.split(' ').join('');
    input = input.split('\\').join('');
    input = input.split('"').join('');
    input = input.split("'").join('');
    input = input.split('[').join('');
    input = input.split(']').join('');
    input = input.split('{').join('');
    input = input.split('}').join('');
    input = input.split('-').join('');
    this.tempId = 'ID' + input;
    return this.tempId;
  }

  getMetaDirectory(list: Array<any>) {
    for (let item of list) {
      if (item[0] == '::meta::') return item;
    }
    return undefined;
  }

  convertSize(num: number){
    if(num > 1000000000000){
      num = num / 1000000000000;
      parseFloat(num.toFixed(2));
      return num + " TB";
    }
    else if(num > 1000000000) {
      num = num / 1000000000;
      parseFloat(num.toFixed(2));
      return num + " GB";
    }
    else if(num > 1000000) {
      num = num / 1000000;
      parseFloat(num.toFixed(2));
      return num + " MB";
    }
    else if(num > 1000) {
      num = num / 1000;
      parseFloat(num.toFixed(2));
      return num + " KB";
    }
    else {
      parseFloat(num.toFixed(2));
      return num + " bytes";
    }
  }

  getFileEnding(inputObject: string) {
    let input = inputObject[0];

    //Check if this input contains an extension, marked by a '.' character
    if (input.includes('.')) {  
      //Get index of the '.' in the file name
      let extensionStart = input.indexOf('.') + 1;

      //Get length (aka last index) of file name
      let extensionEnd = input.length;

      //Return the string between the first '.' and the end of the file name
      return input.substring(extensionStart, extensionEnd);
    }
    
    //Return "NoExtension" for non-files
    return "NoExtension";
  }
}
