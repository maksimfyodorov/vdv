import { Injectable } from '@angular/core';
import { Post } from '../types';

@Injectable({
  providedIn: 'root',
})
export class IntercessionScheduleDataService {

  posts: Post[] = [];
  selectedPost: Post;
  selectedMonth;
  currentPostSchedule;
  shifts;
  MU;

  constructor() {
  }
}
