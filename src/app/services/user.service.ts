import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }
  saveUser(user :firebase.User){
    this.db.object('/users/'+ user.uid).update({
      name:user.displayName,
      email:user.email
    })
  }
  getUser(id:string){
    return this.db.object('/users/'+ id);
  }

}
