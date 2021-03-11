import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface IDataConfirmDialog {
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-note-remove-dialog',
  templateUrl: './note-remove-dialog.component.html',
  styleUrls: ['./note-remove-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteRemoveDialogComponent {
  public disableDialog = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDataConfirmDialog,
    private dialogRef: MatDialogRef<NoteRemoveDialogComponent>,
  ) {
  }

  public close(): void {
    this.dialogRef.close();
  }
}
