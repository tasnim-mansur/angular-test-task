import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { postReducer } from './store/reducers/post.reducer';
import { PostEffects } from './store/effects/post.effects';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostUpdateComponent } from './components/post-update/post-update.component';
import { PostDeleteComponent } from './components/post-delete/post-delete.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {reducers} from "./store/reducers/index";

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'edit/:id', component: PostUpdateComponent },
  { path: 'delete/:id', component: PostDeleteComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostCreateComponent,
    PostUpdateComponent,
    PostDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PostEffects]),
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
