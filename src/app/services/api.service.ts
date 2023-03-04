import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tasks} from "../todos/models/todos.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private tasks: Tasks[] = [];
  private tasksUpdated = new Subject<Tasks>();

  postTask(data: any) {
    return this.http.post<any>("http://localhost:3000/api/taskList", data);
  }

  putTask(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/taskList/" + id, data);
  }

  deleteTask(id: number) {
    return this.http.delete<any>("http://localhost:3000/taskList/" + id);
  }
}
