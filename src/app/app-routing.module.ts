import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileListComponent } from './profile-list/profile-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: 'new', component: ProfileDetailComponent },
  { path: 'list', component: ProfileListComponent },
  { path: 'detail/:id', component: ProfileDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
