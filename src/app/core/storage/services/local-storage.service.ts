import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public save<T>(key: string, item: T): void {
    const serializedItem = JSON.stringify(item);
    localStorage.setItem(key, serializedItem);
  }

  public load<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item == null) {
      return null;
    }

    const deserializedItem = JSON.parse(item);
    return deserializedItem;
  }
}
