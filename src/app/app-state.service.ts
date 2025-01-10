import { Injectable, signal } from '@angular/core';

export interface ResultObject {
  id: String;
  teamOne: string;
  teamTwo: string;
  score: number;
  score2: number;
  date: string
}


export interface Team {
  name: String;
  win: number;
  loose: number;
  points: number;
  numberOfMatch: number;
  goalDifference: number;
  tie: number;  
}

export interface TeamsMap {
  [key: string]: Team;
}

@Injectable({
  providedIn: 'root'
})


export class AppStateService {

  private _items = signal<ResultObject[]>([]);

  private localStorageKey = "AppState";

  constructor() {

    if (typeof window !== 'undefined' && window.localStorage) {

      const existingAppStorage = localStorage.getItem(this.localStorageKey);

      if (existingAppStorage) {
        this.items.update(items => JSON.parse(existingAppStorage));
      }
    }
  }

  get items() {
    return this._items;
  }

  addItems(item: ResultObject): void {
    this.items.update(items => [...items, item]);
    this.updateLocalStorage();
  }

  removeItems(id: string) {
    this._items.update(x => x.filter(a => a.id != id));
    this.updateLocalStorage();
  }

  updateItem(item: ResultObject) {
    this._items.update(x => x.map(a => a.id == item.id ? item : a));
    this.updateLocalStorage();

  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.items()));
  }


}
