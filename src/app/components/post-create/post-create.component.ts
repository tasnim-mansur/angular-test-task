import {Component, Inject, Input, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {createPost, updatePost} from '../../store/actions/post.actions';
import { Router } from '@angular/router';
import {Post} from "../../models/post.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-post-create-update',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  @Input() post: Post | null = null;
  postForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store,
              private dialogRef: MatDialogRef<PostCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { post: Post | null }) {
    this.postForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    if (data?.post) {
      this.postForm.patchValue(data.post);
    }
  }

  ngOnInit(): void {
    // Initial form setup is done in the declaration
  }

  onClose(): void {
    this.dialogRef.close(); // Close the dialog
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      if (post.id) {
        this.store.dispatch(updatePost({id: post.id, post}));
      } else {
        this.store.dispatch(createPost({post}));
      }
      this.postForm.reset();
      this.dialogRef.close();
    }
  }
}


