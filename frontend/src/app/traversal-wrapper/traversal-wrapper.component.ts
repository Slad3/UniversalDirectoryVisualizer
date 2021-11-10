import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'traversal-wrapper',
  templateUrl: './traversal-wrapper.component.html',
  styleUrls: ['./traversal-wrapper.component.css'],
})
export class TraversalWrapperComponent implements OnInit {
  data: {};

  constructor(
	//   private spinner: NgxSpinnerService
	  ) {}

  ngOnInit(): void {
    this.parseDirectoryTest().then((data) => {
      this.data = data;
    });
  }


  async openDrive() {
    // this.spinner.show();
    fetch('http://localhost:39393/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data['Error']) {
          this.parseDirectory(data.filePath).then((data) => {
            this.data = data;
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
