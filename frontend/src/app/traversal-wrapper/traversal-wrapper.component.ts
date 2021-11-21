/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'traversal-wrapper',
  templateUrl: './traversal-wrapper.component.html',
  styleUrls: ['./traversal-wrapper.component.css'],
})
export default class TraversalWrapperComponent implements OnInit {
  data: {};

  ngOnInit(): void {
    if (location.host.toString() === 'localhost:4200') {
      this.parseDirectoryTest().then((data) => {
        this.data = data;
      });
    }
  }

  closeApp() {
    window.close();
  }

  async openDrive() {
    // this.spinner.show();
    fetch('http://localhost:39393/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.Error) {
          this.parseDirectory(data.filePath).then((data_) => {
            this.data = data_;
            // this.spinner.hide();
          });
        } else {
        //   this.spinner.hide();
        }
      });
  }

  async parseDirectory(directory: string) {
    const formData = new FormData();
    formData.append('directory', directory);

    return await (
      await fetch('http://localhost:18989/parseDirectory/', {
        method: 'post',
        body: formData,
      })
    ).json();
  }

  async parseDirectoryTest() {
    return await (await fetch('http://localhost:18989/test')).json();
  }
}
