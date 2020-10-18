import { Component } from '@angular/core';
import {FileOpener} from '@ionic-native/file-opener/ngx'
import {File} from '@ionic-native/File/ngx'
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private platform: Platform, private fileopener: FileOpener,
    private ft: FileTransfer,private file: File, private document: DocumentViewer) {}



openLocalPdf () {
let filePath = this.file.applicationDirectory + 'www/assets';

if (this.platform.is('android')){
  let fakeName = Date.now();
  this.file.copyFile(filePath,'T.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
    this.fileopener.open(result.nativeURL, 'application/pdf');

  }
  );
} else{
  const options: DocumentViewerOptions = {
    title: 'My PDF'
  }
  this.document.viewDocument(`${filePath}/T.pdf`,'application/pdf',options);
}
}

downloadAndOpenPdf () {
let downloadUrl= 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
let path = this.file.dataDirectory;
const transfer = this.ft.create();

transfer.download(downloadUrl, `${path}myfile.pdf`).then(entry => {
  let url = entry.toURL();

  if (this.platform.is('ios')) {
this.document.viewDocument(url, 'application/pdf',{});


  } else {
    this.fileopener.open(url, 'application/pdf');
  }

});
}
}