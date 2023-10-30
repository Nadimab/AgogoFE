import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealprepComponent } from './mealprep/mealprep.component';

const routes: Routes = [
  { path: 'mealprep', component: MealprepComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
