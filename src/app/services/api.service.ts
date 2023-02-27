import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {config} from 'src/app/todos/todos.config'
import { Tasks } from "../todos/models/todos.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,
              firestore: AngularFirestore) { }

  postTask(data: any){
    return this.http.post<any>("http://localhost:3000/taskList", data);
  }
  getTask(){
    return this.http.get<any>("http://localhost:3000/taskList");
  }

  putTask(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/taskList/"+id, data);
  }
  deleteTask(id: number) {
    return this.http.delete<any>("http://localhost:3000/taskList/" + id);
  }
}
