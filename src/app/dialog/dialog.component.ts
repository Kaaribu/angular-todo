import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  priorityList: string[] = ["Urgent", "Moderate", "Normal"];
  todoForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService,
              private dialogRef: MatDialogRef<DialogComponent, any>) {
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addTask() {
    if (this.todoForm.valid) {
      this.api.postTask(this.todoForm.value).subscribe((res: any) => {
        alert("Task Added Successfully");
        this.todoForm.reset();
        this.dialogRef.close();
      },
        error => {
          alert("Something went wrong");
        })
    }
  }
}

