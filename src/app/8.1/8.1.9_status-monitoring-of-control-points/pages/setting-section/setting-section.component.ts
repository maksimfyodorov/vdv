import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingSectionService } from './services/setting-section.service';
import { Post } from './types/setting';

@Component({
  selector: 'app-setting-section',
  templateUrl: './setting-section.component.html',
  styleUrls: ['./setting-section.component.scss'],
})
export class SettingSectionComponent implements OnInit {
  @Input() set militaryUnitId(value) {
    this.currentMilitaryUnitId = value;
    this.checkPermission();
    this.getPosts();
  }

  posts: Post[];

  userMuid: number;
  isLoading = false;
  isChangingPostPermitted: boolean;
  currentMilitaryUnitId: number;

  constructor(
    private fb: FormBuilder,
    private httpService: SettingSectionService,
  ) {
  }

  ngOnInit(): void {
    this.getUserMuid();
  }

  getPosts(): void {
    this.httpService.getPosts(this.currentMilitaryUnitId).subscribe((data) => {
      this.posts = data;
    });
  }

  addPost(): void {
    const newFormData: Post  = {
      uuid: null,
      atsMo: '',
      atsR: '',
      militaryUnitId: this.currentMilitaryUnitId,
      msOek: '',
      number: '',
      shifts: [],
      zsSpd: '',
      zvks: '',
    };

    this.posts.push(newFormData);
  }

  public onUpdated(data: { submittedFormValue: Post, formGroup: FormGroup}): void {
    this.isLoading = true;

    const { uuid, ...rest } = data.submittedFormValue;

    const postParams: Post = {
      ...rest,
      militaryUnitId: this.currentMilitaryUnitId,
    };

    this.httpService.updatePost(uuid, postParams).subscribe(() => {
      this.isLoading = false;
      data.formGroup.markAsPristine();
    });
  }

  public onDeletedOldPost(deletedPostUuid: string): void {
    this.isLoading = true;

    this.httpService.deletePost(deletedPostUuid).subscribe(() => {
      this.posts = this.posts.filter((post) => post.uuid !== deletedPostUuid);
      this.isLoading = false;
    });
  }

  public onDeletedNewPost(formIndex: number): void {
    this.posts = this.posts.filter((post, index) => index !== formIndex);
  }

  public onAdded(data: { newPostData: Post, formIndex: number }): void {
    this.isLoading = true;


    const postParams: Post = {
      militaryUnitId: this.currentMilitaryUnitId,
      ...data.newPostData,
    };

    this.httpService.addPost(postParams).subscribe((post) => {
      this.isLoading = false;

      this.posts[data.formIndex] = post;
    });
  }

  public getUserMuid(): void {
    this.httpService.getUserInfo().subscribe(({ user_data }) => {
      this.userMuid = user_data.mu_id;
      this.checkPermission();
    });
  }

  public checkPermission(): void {
    this.isChangingPostPermitted = this.currentMilitaryUnitId === this.userMuid;
  }
}
