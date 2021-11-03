import { Component, OnInit } from '@angular/core';

// import * as Electron from 'electron'

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




    // this.parseDirectory('C:\\Users\\Ben\\Documents\\Cheat Sheets').then(
    //   (data) => {
    //     this.data = data;
    //   }
    // );
  }


  async openDrive(){
	fetch('http://localhost:39393/')
	.then(response => response.json())
	.then(data => {
		console.log(data)
		if(!data['Error']){
			this.parseDirectory(data.filePath).then(
				(data) => {
				  this.data = data;
				}
			  );
		}
	})
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

    let data = await (await fetch('http://localhost:18989/test')).json();
    return data;
  }
}
