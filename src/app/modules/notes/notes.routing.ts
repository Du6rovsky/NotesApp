import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {NotesComponent} from '@app/modules/notes/notes.component';

export const notesRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotesComponent
  }
];

export const notesRouting: ModuleWithProviders<any> = RouterModule.forChild(notesRoutes);
