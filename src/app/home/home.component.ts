import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as html2canvas from "html2canvas"
import {MatDialog} from '@angular/material';
import { IssueComponent } from 'src/app/issue/issue.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [IssueComponent]
})
export class HomeComponent {

  pdfSrc: string = '/pdf-test.pdf';

  constructor( public dialog: MatDialog) { }

  onFileInput($event): void {
    this.ReadPDF($event.target);
  }

  ReadPDF(inputValue: any) {
    let file = inputValue.files[0];

    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer(file);
    }
  }

  screenshot() {
    html2canvas(document.getElementById('pdf')).then((canvas) => {
      const dialogRef = this.dialog.open(IssueComponent, {
        width: '250px',
        data: {name: 'this.name', image: canvas.toDataURL()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });

      // window.open().document.write('<img src="' + canvas.toDataURL() + '" />');
    });
  }
}
