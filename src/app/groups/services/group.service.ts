import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoaderService} from "../../core/services/loader.service";
import {ToolbarService} from "../../core/services/toolbar.service";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Group} from "../models/group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groups: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([])

  get groups$(): Observable<Group[]> {
    return this.groups.asObservable();
  }

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private toolbarService: ToolbarService) { }


  getGroupById(id: number): Observable<Group> {
    this.loaderService.setLoadingState(true)
    return this.http.get<Group>(`http://localhost:3000/groups/${id}`)
      .pipe(
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  getGroup(): Observable<Group[]> {
    this.loaderService.setLoadingState(true)
    return this.http.get<Group[]>('http://localhost:3000/groups')
      .pipe(
        tap((data) => this.updateGroups(data)),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  addGroup(group: Group): Observable<Group> {
    this.loaderService.setLoadingState(true)
    return this.http.post<Group>('http://localhost:3000/groups', group)
      .pipe(
        tap(data => this.updateGroups([...this.groups.value, data])),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  delete(group: Group) {
    this.loaderService.setLoadingState(true)
    return this.http.delete(`http://localhost:3000/groups/${group.id}`)
      .pipe(
        tap(() => this.updateGroups(this.groups.value.filter(t => t.id !== group.id))),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  update(group: Group): Observable<Group> {
    this.loaderService.setLoadingState(true)
    return this.http.put<Group>(`http://localhost:3000/groups/${group.id}`, group)
      .pipe(
        tap((data: Group) => {
          const groups = this.groups.value;
          const index = groups.findIndex(t => t.id === group.id);
          groups[index] = data;
          this.updateGroups(groups);
        }),
        tap({
          next: () => this.loaderService.setLoadingState(false),
          error: () => this.loaderService.setLoadingState(false)
        })
      );
  }

  private updateGroups(groups: Group[]) {
    this.groups.next(groups);
    this.toolbarService.setNumberOfGroups(this.groups.value.length);
  }
}
