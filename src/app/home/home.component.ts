import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as html2canvas from "html2canvas"
import {MatDialog} from '@angular/material';
import { IssueComponent } from '../issue/issue.component';
import { PDFDocumentProxy } from 'node_modules/ng2-pdf-viewer/src/app/pdf-viewer/pdf-viewer.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [IssueComponent]
})
export class HomeComponent {

  pdfSrc: string;
  currentPage: number = 1;
  numPages: number = 1;

  constructor( public dialog: MatDialog) { }

  onFileInput($event): void {
    this.ReadPDF($event.target);
  }

  next() {
    this.currentPage= this.currentPage+1;
  }

  previous() {
    this.currentPage= this.currentPage-1;
  }

  callBackFn(pdf: PDFDocumentProxy) {
    // do anything with "pdf"
    this.numPages = pdf.numPages;
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

    const dialogRef = this.dialog.open(IssueComponent, {
      data: {name: 'this.name', image: 'test' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    html2canvas(document.getElementById('pdf')).then((canvas) => {

      canvas.toDataURL();

      window.open().document.write('<img src="' + canvas.toDataURL() + '" />');
    });
  }
}
