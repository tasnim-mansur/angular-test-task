import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostUpdateComponent } from './components/post-update/post-update.component';
import { PostDeleteComponent } from './components/post-delete/post-delete.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:id', component: PostUpdateComponent },
  { path: 'delete/:id', component: PostDeleteComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
