import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { HttpClient} from "@angular/common/http";
import { AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Tasks} from "../todos/models/todos.model";

{
    let messageBoxContent = marker('messagebox.warning.text');
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  // @ts-ignore
  tasks = this.store.collection('tasks').valueChanges({ idField: 'id' }) as Observable<Tasks[]>;

  priorityList: string[] = ["Urgent", "Moderate", "Normal"];
  todoForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder, private api: ApiService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private http: HttpClient,
              private store: AngularFirestore) {
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.todoForm.controls['taskName'].setValue(this.editData.taskName);
      this.todoForm.controls['category'].setValue(this.editData.category);
      this.todoForm.controls['priority'].setValue(this.editData.priority);
      this.todoForm.controls['description'].setValue(this.editData.description);
      this.todoForm.controls['date'].setValue(this.editData.date);
    }
  }

  addTask() {
    if (!this.editData) {
      if (this.todoForm.valid) {
        this.api.postTask(this.todoForm.value).subscribe({
          next: (res) => {
            alert('Task added successfully')
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert("Error while adding task!");
          }
        })
      }
    } else {
      if (this.todoForm.valid) {
        this.api.putTask(this.todoForm.value, this.editData.id).subscribe({
          next: (res) => {
            alert('Task updated successfully')
            this.dialogRef.close('update');
          },
          error: (err) => {
            alert('Error while updating task');
          }
        })
      }
    }
  }

}










