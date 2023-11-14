import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientAddEditComponent } from '../client-add-edit/client-add-edit.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  constructor(private _dialog: MatDialog) { }

  openAddClientDialog() {
    this._dialog.open(ClientAddEditComponent, {
      width: '500px',
      data: {
        title: 'Add Client'
      }
    });
  }

}
