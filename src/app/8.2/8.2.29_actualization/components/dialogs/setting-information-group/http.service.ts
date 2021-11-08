import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { InformationGroup, SharedProperty } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  sectionStream$ = new BehaviorSubject('');
  characterStream$ = new BehaviorSubject('');
  refreshStream$ = new BehaviorSubject('');
  //// InformationGroups
  getInformationGroups(): Observable<InformationGroup[]> {
    return this.http.get<InformationGroup[]>('/api/io/group')
  }

  createInformationGroup(group): Observable<any> {
    return this.http.post<any>('api/io/group', group)
  }

  makeInformationGroup(group): Observable<any> {
    return this.http.post<any>(`api/io/group`,group)
  }

  editInformationGroup(uuid: string, group): Observable<any> {
    return this.http.put<any>(`api/io/group/${uuid}`,group)
  }

  deleteInformationGroup(group): Observable<any> {
    return this.http.delete<any>(`api/io/group/${group.uuid}`)
  }

  ////end


  //Section
  getSections(): Observable<SharedProperty[]> {
    return this.http.get<SharedProperty[]>('api/io/section')
  }

  createSection(name: string): Observable<SharedProperty> {
    return this.http.post<SharedProperty>('api/io/section', {name: name})
  }

  deleteSection(group): Observable<SharedProperty> {
    return this.http.delete<SharedProperty>(`api/io/section/${group.uuid}`)
  }

  editSection(section: SharedProperty): Observable<SharedProperty> {
    return this.http.put<SharedProperty>(`api/io/section/${section.uuid}`, {name: section.name})
  }
  //end-Section

  //Character
  getCharacters(): Observable<SharedProperty[]> {
    return this.http.get<SharedProperty[]>('api/io/character')
  }

  createCharacter(name: string): Observable<SharedProperty> {
    return this.http.post<SharedProperty>('api/io/character', {name: name})
  }

  deleteCharacter(group): Observable<SharedProperty> {
    return this.http.delete<SharedProperty>(`api/io/character/${group.uuid}`)
  }

  editCharacter(section: SharedProperty): Observable<SharedProperty> {
    return this.http.put<SharedProperty>(`api/io/character/${section.uuid}`, {name: section.name})
  }
  //end-Character

  //Form
  getForms(): Observable<SharedProperty[]> {
    return this.http.get<SharedProperty[]>('api/io/form')
  }

  createForm(name: string): Observable<SharedProperty> {
    return this.http.post<SharedProperty>('api/io/form', {name: name})
  }

  deleteForm(form): Observable<SharedProperty> {
    return this.http.delete<SharedProperty>(`api/io/form/${form.uuid}`)
  }

  editForm(form: SharedProperty): Observable<SharedProperty> {
    return this.http.put<SharedProperty>(`api/io/form/${form.uuid}`, {name: form.name})
  }
  //end-Form


}
