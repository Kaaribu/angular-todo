import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  todoList: any[] = ["Urgent", "Moderate", "Normal"];
  todoForm !: FormGroup;
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      listName: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  addTask() {
    console.log(this.todoForm.value);
  }
}


