import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'new-employment',
    loadChildren: './new-employment/new-employment.module#NewEmploymentModule'
  },
  {
    path: '',
    redirectTo: 'new-employment',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
