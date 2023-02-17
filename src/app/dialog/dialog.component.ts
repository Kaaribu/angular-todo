import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  priorityList: string[] = ["Urgent", "Moderate", "Normal"];
  todoForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder, private api: ApiService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      check: [false],
      taskName: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.todoForm.controls['check']
      this.todoForm.controls['taskName'].setValue(this.editData.taskName);
      this.todoForm.controls['category'].setValue(this.editData.category);
      this.todoForm.controls['priority'].setValue(this.editData.priority);
      this.todoForm.controls['description'].setValue(this.editData.description);
      this.todoForm.controls['date'].setValue(this.editData.date);
    }
  }

  addTask() {
    if(!this.editData) {
      if(this.todoForm.valid) {
        this.api.postTask(this.todoForm.value).subscribe({
          next: (res) => {
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert("Error while adding task!");
          }
        });
      }
    }
    else {
      this.updateTask()
  }
}

  updateTask() {
    if(this.editData) {
      if (this.todoForm.valid) {
        this.api.putTask(this.todoForm.value, this.editData.id).subscribe({
          next: (res) => {
            this.dialogRef.close('update');
          },
          error: (err) => {
            alert("Error while updating task!");
          }
        });
      }
    }
  }
}







