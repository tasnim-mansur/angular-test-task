import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createPost } from '../../store/actions/post.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.store.dispatch(createPost({ post: this.postForm.value }));
      this.router.navigate(['/posts']);
    }
  }
}
