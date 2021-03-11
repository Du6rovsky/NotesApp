import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteRemoveDialogComponent } from './note-remove-dialog.component';

describe('NoteRemoveDialogComponent', () => {
  let component: NoteRemoveDialogComponent;
  let fixture: ComponentFixture<NoteRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteRemoveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
