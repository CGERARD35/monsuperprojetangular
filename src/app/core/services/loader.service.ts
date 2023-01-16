import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

/***
 * Ce service permet de partager l'état de chargement de l'application à tout les composants qui en ont besoin
 * - isLoading$ est un observable qui permet de s'abonner à l'état de chargement
 * - isLoading est un BehaviorSubject qui permet de stocker
 * - updateLoadingState permet de modifier l'état de chargement en injectant la nouvelle donnée dans le BehaviorSubject isLoading
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setLoadingState(state: boolean) {
    this.isLoading.next(state);
  }
}
