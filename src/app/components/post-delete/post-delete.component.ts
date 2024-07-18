import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deletePost } from '../../store/actions/post.actions';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {
  postId: number;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.store.dispatch(deletePost({ id: this.postId }));
    this.router.navigate(['/posts']);
  }
}
