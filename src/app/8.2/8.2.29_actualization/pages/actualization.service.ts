import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regulation } from '../components/dialogs/settings-information-array/interfaces/regulation';

@Injectable({
  providedIn: 'root'
})
export class ActualizationService {

  constructor(private http: HttpClient) { }

  getRegulations(): Observable<Regulation[]> {
    return this.http.get<Regulation[]>('/api/io/regulation');
  }

  deleteRegulation(regulation: Regulation){
    return this.http.delete(`/api/io/regulation/${regulation.uuid}`);
  }
}
