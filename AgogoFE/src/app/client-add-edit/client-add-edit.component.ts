import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.css']
})
export class ClientAddEditComponent implements OnInit {

  clientForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<ClientAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { 
    this.clientForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: ''
    });
  }

  ngOnInit(): void {
    this.clientForm.patchValue(this.data);
  }

  onFormSubmit() {
    this._dialogRef.close(this.clientForm.value);
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
