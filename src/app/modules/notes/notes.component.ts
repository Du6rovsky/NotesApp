import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NotesComponent implements OnInit {
  constructor() {
  }

  public ngOnInit(): void {
  }
}
