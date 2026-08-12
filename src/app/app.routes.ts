import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { StudentComponent } from './student/student';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'students',
    component: StudentComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
