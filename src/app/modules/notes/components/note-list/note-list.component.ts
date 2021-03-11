import {Component, OnDestroy, OnInit} from '@angular/core';
import {NoteEntity} from '@app/core/entities/note.entity';
import {Store} from '@ngxs/store';
import {NoteState, SetActiveNote, SetActiveTag, SetTags} from '@app/shared/states/note.state';
import {MatDialog} from '@angular/material/dialog';
import {NoteRemoveDialogComponent} from '@app/modules/notes/components/note-remove-dialog/note-remove-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as moment from 'moment';
import {CONFIG} from '@app/configs/config';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  public notes: NoteEntity[] = [];
  public filteredNotes: NoteEntity[] = [];
  public activeNote: NoteEntity = new NoteEntity();
  public activeTag: string;
  public query = '';
  public destroy$ = new Subject();

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {
    this.store
      .select(NoteState.active_note)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.updateActiveNote(res);
        }
      });

    this.store
      .select(NoteState.active_tag)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.activeTag = res;
        if (!this.activeNote.tags.includes(this.activeTag)) {
          const emptyNote = new NoteEntity();
          emptyNote.id = '';
          this.store.dispatch(new SetActiveNote(emptyNote));
        }
        this.toFilterList();
      });

    this.store
      .select(NoteState.q)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.query = res;
        this.toFilterList();
      });
  }

  public ngOnInit(): void {
    const savedNotes = localStorage.getItem('notes');

    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
      this.filteredNotes = this.notes;
      this.tagsHandler();
    }
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public setActiveNote(note: NoteEntity) {
    this.store.dispatch(new SetActiveNote(note));
  }

  public removeNote(note: NoteEntity, index: number) {
    this.dialog
      .open(NoteRemoveDialogComponent, {
        data: {
          message: `Are you sure want to delete note "${note.header}"`
        },
        disableClose: false,
      })
      .beforeClosed()
      .subscribe((result) => {
        if (result === true) {
          this.noteRemove(index, note);
        }
      });
  }

  public addNote() {
    const note = new NoteEntity();
    note.date = moment().format(CONFIG.date_format);
    this.notes.push(note);
    this.toFilterList();
    this.saveNotesToStorage();
  }

  public noteRemove(index: number, note: NoteEntity) {
    this.notes.splice(index, 1);
    this.tagsHandler();
    if (this.activeNote.id === note.id) {
      const emptyNote = new NoteEntity();
      emptyNote.id = '';
      this.store.dispatch(new SetActiveNote(emptyNote));
    }
    this.store.dispatch(new SetActiveTag(''));
    this.toFilterList();
    this.saveNotesToStorage();
  }

  public updateActiveNote(note: NoteEntity) {
    this.activeNote = note;
    this.notes = [...this.notes.map((n: NoteEntity) => {
      if (n.id === note.id) {
        n = note;
      }
      return n;
    })];
    this.toFilterList();
    this.tagsHandler();
    this.saveNotesToStorage();
  }

  public saveNotesToStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  public tagsHandler() {
    let tags: string[] = [];
    this.notes.map((n: NoteEntity) => {
      tags = [...tags.concat(n.tags)];
    });
    tags = [...new Set(tags)];
    this.store.dispatch(new SetTags(tags));
  }

  public toFilterList() {
    let filteredNotes =
      [...this.notes.filter((n: NoteEntity) => this.query ? n.header.toLowerCase().includes(this.query.toLowerCase()) : n)];
    if (this.activeTag) {
      filteredNotes = [...filteredNotes.filter((n: NoteEntity) => n.tags.includes(this.activeTag))];
    }
    this.filteredNotes = [...filteredNotes];
  }
}
