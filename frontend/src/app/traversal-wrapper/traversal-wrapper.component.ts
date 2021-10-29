import { Component, OnInit } from '@angular/core';

// import * as Electron from 'electron'
import { ipcRenderer } from 'electron';

// const { remote } = require('electron');
// const mainProcess = remote.require('./main.js');

@Component({
  selector: 'traversal-wrapper',
  templateUrl: './traversal-wrapper.component.html',
  styleUrls: ['./traversal-wrapper.component.css'],
})
export class TraversalWrapperComponent implements OnInit {
  data: {};

  constructor() {}

  ngOnInit(): void {
    if ((<any>window).require) {
      try {
        const ipc = (<any>window).require('electron').ipcRenderer;
        ipc.send('customChannel', 'this is a test');
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }

    this.parseDirectoryTest('C:\\Users\\Ben\\Documents\\Cheat Sheets').then(
      (data) => {
        this.data = data;
      }
    );
  }

  async parseDirectory(directory: string) {
    const formData = new FormData();
    formData.append('directory', directory);

    let data = await (
      await fetch('http://localhost:18989/parseDirectory/', {
        method: 'post',
        body: formData,
      })
    ).json();
    return data;
  }

  async parseDirectoryTest(directory: string) {
    const formData = new FormData();
    formData.append('directory', directory);

    let data = await (
      await fetch('http://localhost:18989/test/', {
        method: 'post',
        body: formData,
      })
    ).json();
    return data;
  }
}
