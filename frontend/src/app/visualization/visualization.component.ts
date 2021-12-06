/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
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

  tempId: string;

  counter: number;

  ngOnInit(): void {
    console.log(this.data);

    this.fullObject = JSON.stringify(this.data);
    this.counter = 0;
  }

  /*
   * Function that gets the items of a file array
   * @param any files - The file object
   * @return files - The file obejct if it is an array
   * @return temp - unsure what this is
   */
  getItems(files: any) {
    if (Array.isArray(files)) {
      return files;
    }

    const temp = Object.entries(files);
    temp.sort((a, b) => {
      if (this.isNumber(a[1]) && this.isNumber(b[1])) {
        return Number(b[1]) - Number(a[1]);
      }
    });
    return temp;
  }

  /*
   * Function that checks if a given member is a Number
   * @param any object - the object to check
   * @return boolean - true if the passed object is a Number
   */
  isNumber(object: any) {
    return Number.isInteger(object);
  }

  /**
   * Function that sets an identifier on an object
   * @param inputObject - The object to be id'd
   * @param list - Not sure what this is
   * @returns - the temporary id for the object
   */
  setId(inputObject: string, list: any) {
    let input = inputObject[0];
    if (input === '::files::') {
      if (!this.getMetaDirectory(list)) {
        this.tempId = 'filesUpper';
      } else {
        this.tempId = this.getMetaDirectory(list)[1].htmlId;
        this.tempId = this.tempId.split('.').join('');
      }

      return this.tempId;
    }

    // if (!this.getMetaDirectory(list)) {
    //   input = input.split(' ').join('');
    //   input = input.split('\\').join('');
    //   input = input.split('"').join('');
    //   input = input.split("'").join('');
    //   input = input.split('[').join('');
    //   input = input.split(']').join('');
    //   input = input.split('{').join('');
    //   input = input.split('}').join('');
    //   input = input.split('-').join('');
    //   // this.tempId = 'ID' + input + this.counter;
    //   this.tempId = 'ID' + input;
    // } else {
    //   this.tempId = this.getMetaDirectory(list)[1]['htmlId'];
    //   this.tempId = this.tempId.split('.').join('');
    // }

    // return this.tempId;

    input = input.split(' ').join('');
    input = input.split('\\').join('');
    input = input.split('"').join('');
    input = input.split("'").join('');
    input = input.split('[').join('');
    input = input.split(']').join('');
    input = input.split('{').join('');
    input = input.split('}').join('');
    input = input.split('-').join('');
    // this.tempId = 'ID' + input + this.counter;

    this.tempId = `ID${input}`;
    this.counter++;
    return this.tempId;
  }

  /**
   * Function that returns the meta information of a passed directory
   * @param list - the array (file object) to get the meta directory of
   * @returns item if ::meta:: is foundm, undefined if not
   */
  getMetaDirectory(list: Array<any>) {
    for (const item of list) {
      if (item[0] === '::meta::') return item;
    }
    return undefined;
  }

  /**
   * Function that converts a number (of bytes) into the largest unit of bytes possible
   * @param num - The number to convert
   * @returns the converted number fixed to 2 decimal points
   */
  convertSize(num: number) {
    if (num > 1000000000000) {
      num /= 1000000000000;
      parseFloat(num.toFixed(2));
      return `${num.toFixed(2)} TB`;
    }
    if (num > 1000000000) {
      num /= 1000000000;
      parseFloat(num.toFixed(2));
      return `${num.toFixed(2)} GB`;
    }
    if (num > 1000000) {
      num /= 1000000;
      parseFloat(num.toFixed(2));
      return `${num.toFixed(2)} MB`;
    }
    if (num > 1000) {
      num /= 1000;
      parseFloat(num.toFixed(2));
      return `${num.toFixed(2)} KB`;
    }

    parseFloat(num.toFixed(2));
    return `${num} bytes`;
  }

  /**
   * Function that extracts the file-ending of a given file (delimited by '.')
   * @param inputObject - object to get the ending of
   * @returns the file ending
   */
  getFileEnding(inputObject: string) {
    const input = inputObject;

    // Check if this input contains an extension, marked by a '.' character
    if (input.includes('.')) {
      // Get index of the '.' in the file name
      const extensionStart = input.indexOf('.') + 1;

      // Get length (aka last index) of file name
      const extensionEnd = input.length;

      // Return the string between the first '.' and the end of the file name
      return input.substring(extensionStart, extensionEnd);
    }

    // Return "NoExtension" for non-files
    return undefined;
  }

  /**
   * Function that checks if an element should be shown
   * @param element - Element of JSON object
   * @returns true if element should be shown, false if not
   */
  showElement(element: any) {
    if (element[0] === '::meta::') {
      return false;
    }

    if (element[0] === '::files::' && this.getItems(element[1]).length < 1) {
      return false;
    }

    return true;
  }

  /**
   * Function that gets the total size of a given folder
   * @param item - Folder object
   * @returns The total folder size
   */
  getFolderSize(item) {
    if (this.isNumber(item)) return false;

    if (item['::meta::']) {
      return this.convertSize(item['::meta::']['size']);
    } else {
      let total = 0;
      item = this.getItems(item);
      for (let i of item) {
        total += i[1];
      }
      return this.convertSize(total);
    }
  }
}
