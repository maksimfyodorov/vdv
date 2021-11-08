import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {OSPOHistoryChanges} from '../interfaces/camera-history.interface';

@Injectable()
export class CameraChangeHistoryService {

  constructor(private httpClint: HttpClient) {
  }
}
