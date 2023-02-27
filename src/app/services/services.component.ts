import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  constructor(private db: AngularFirestore) {

  }


  getAllTasks() {
    return new Promise<any>((resolve)=> {
    this.db.collection('tasks').valueChanges({ idField: 'id' }).
    subscribe(tasks => resolve(tasks));
    })
  }

}
