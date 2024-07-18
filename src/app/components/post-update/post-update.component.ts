import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../store/reducers'; // Ensure correct path
import { Post } from '../../models/post.model';
import { updatePost } from '../../store/actions/post.actions';
import { selectPosts } from '../../store/selectors/post.selectors';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit {
  postForm: FormGroup;
  post$: Observable<Post | undefined> = of(undefined); // Initialize with default value

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>, // Type the store with AppState
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.post$ = this.store.pipe(
      select(selectPosts),
      map(posts => posts.find(post => post.id === id)) // Use map from rxjs/operators
    );
    this.post$.subscribe(post => {
      if (post) {
        this.postForm.patchValue(post);
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.store.dispatch(updatePost({ id, post: this.postForm.value }));
      this.router.navigate(['/posts']);
    }
  }
}
