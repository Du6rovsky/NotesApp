import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteFormComponent} from './components/note-form/note-form.component';
import {NotesComponent} from '@app/modules/notes/notes.component';
import {notesRouting} from '@app/modules/notes/notes.routing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {SearchComponent} from './components/search/search.component';
import {DirectivesModule} from '@app/core/directives/directives.module';
import {NoteListComponent} from './components/note-list/note-list.component';
import {TagsComponent} from './components/tags/tags.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {NoteRemoveDialogComponent} from './components/note-remove-dialog/note-remove-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PipesModule} from '@app/core/entities/pipes.module';

@NgModule({
  declarations: [
    NoteFormComponent,
    NotesComponent,
    SearchComponent,
    NoteListComponent,
    TagsComponent,
    NoteRemoveDialogComponent
  ],
  imports: [
    CommonModule,
    notesRouting,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    DirectivesModule,
    ClickOutsideModule,
    MatDialogModule,
    PipesModule
  ],
})
export class NotesModule {
}
