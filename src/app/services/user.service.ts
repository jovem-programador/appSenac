import { User } from 'src/app/interface/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection = this.afs.collection<User>('users');

  constructor(private afs: AngularFirestore) {
    // this.usersCollection = this.afs.collection<User>('users');
  }
  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );

  }

  addUser(user: User) {
    return this.usersCollection.add(user);
  }
  getUser(id: string) {
    return this.usersCollection.doc<User>(id).valueChanges();
  }

  updateUser(id: string, user: User) {

  }

  deleteUser(id: string) {

  }



}
