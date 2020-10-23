import { HttpClient, } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  CSVForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.CSVForm = new FormGroup({
      fileInput: new FormControl()
    });

    this.CSVForm.valueChanges.subscribe(({ fileInput }) => {
      const formData = new FormData();
      formData.append('file', this.CSVForm.get('fileInput').value.files[0]);
      this.http.post('http://localhost:4000/upload', formData).subscribe(res => { })
    })
  }

}
