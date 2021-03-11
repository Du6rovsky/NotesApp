import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NoteEntity} from '@app/core/entities/note.entity';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {NoteState, SetActiveNote} from '@app/shared/states/note.state';
import {Subject} from 'rxjs';
import * as moment from 'moment';
import {CONFIG} from '@app/configs/config';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoteFormComponent implements OnInit, OnDestroy {
  @ViewChild('noteDesc', {static: false}) public noteDesc;

  public isEditHeader = false;
  public isEditContent = false;
  public note: NoteEntity = new NoteEntity();
  public activeTag: string;
  public noteForm: FormGroup;
  public destroy$ = new Subject();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
  ) {
    this.note.id = null;

    this.store
      .select(NoteState.active_note)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.note = JSON.parse(JSON.stringify(res));
          setTimeout(() => {
            this.hashTagsHandler();
          });
        }
      });

    this.store
      .select(NoteState.active_tag)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeTag = res;
        setTimeout(() => {
          this.hashTagsHandler();
        });
      });
  }

  public ngOnInit(): void {
    this.prepareForm();
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public prepareForm() {
    this.noteForm = this.formBuilder.group({
      header: new FormControl(''),
      content: new FormControl(''),
    });
  }

  public toEditHeader() {
    if (!this.isEditHeader) {
      setTimeout(() => {
        this.isEditHeader = true;
        this.noteForm.controls.header.setValue(this.note.header);
      });
    }
  }

  public toSaveHeader() {
    if (this.isEditHeader) {
      this.isEditHeader = false;
      this.note.header = this.noteForm.value.header;
      this.note.date = moment().format(CONFIG.date_format);
      this.store.dispatch(new SetActiveNote(this.note));
    }
  }

  public toEditContent() {
    if (!this.isEditContent) {
      setTimeout(() => {
        this.isEditContent = true;
        this.noteForm.controls.content.setValue(this.note.content);
      });
    }
  }

  public toSaveContent() {
    if (this.isEditContent) {
      this.isEditContent = false;
      this.note.content = this.noteForm.value.content;
      this.note.date = moment().format(CONFIG.date_format);
      setTimeout(() => {
        this.hashTagsHandler();
        this.store.dispatch(new SetActiveNote(this.note));
      });
    }
  }

  public hashTagsHandler() {
    if (this.noteDesc) {
      const tags = [];
      const res = this.noteDesc.nativeElement.innerText.replace((/#(\w+)/g), (x) => {
        tags.push(x);
        return `<span class="hash_tag ${String(x).toLowerCase() === String(this.activeTag).toLowerCase() ? 'active' : ''}">${x}</span>`;
      });
      this.note.tags = [...new Set(tags)];

      this.noteDesc.nativeElement.innerHTML = res;
    }
  }
}
