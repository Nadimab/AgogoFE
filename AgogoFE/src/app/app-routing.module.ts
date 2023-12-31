import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealprepComponent } from './mealprep/mealprep.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: '', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mealprep', component: MealprepComponent },
  { path: 'clients', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
