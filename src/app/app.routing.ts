import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

export const rootRoutes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    // Notes routes
    path: 'notes',
    loadChildren: () => import('./modules/notes/notes.module').then((m) => m.NotesModule)
  }
];

export const rootRouting: ModuleWithProviders<any> = RouterModule.forRoot(rootRoutes);
