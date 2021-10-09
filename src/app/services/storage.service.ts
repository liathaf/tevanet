import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })


export class StorageService{

    public saveToStorage(key: string, val: any) {
        localStorage.setItem(key, JSON.stringify(val))
    }
    
    public loadFromStorage(key: string):[] {
        var val:any = localStorage.getItem(key)
        return JSON.parse(val)
    }
    public removeFromStorage(key: string) {
        localStorage.removeItem(key);
    }
}