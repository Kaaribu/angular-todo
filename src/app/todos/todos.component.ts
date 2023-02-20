import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../services/api.service";
import {DialogComponent} from "../dialog/dialog.component";
import {TranslateComponent} from "../translate/translate.component";
import {TranslateService} from "@ngx-translate/core";
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

{
    let messageBoxContent = marker('messagebox.warning.text');
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  displayedColumns: string[] = ['taskName', 'category', 'date', 'priority', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input('isEditing') isEditingProps: boolean = true;

  constructor(private dialog: MatDialog, private api: ApiService,
              private translate: TranslateService) {
    this.stateOptions = [
      {'label': 'Hindi', value: 'hi'},
      {'label': 'English', value: 'en'},
      {'label': 'French', value: 'fr'},
      {'label': 'German', value: 'de'},
    ];


    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  onLanguageChange(item: any) {
    this.translate.use(item.value);
  }

  stateOptions: any[];
  value1:string = 'en'

  OpenDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllTasks();
      }
    });
  }

   OpenTranslator() {
     this.dialog.open(TranslateComponent, {
       width: '30%',
     });
  }

  getAllTasks() {
    this.api.getTask().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching tasks!");
      }
    })
  }

  editTask(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllTasks();
      }
    });
  }

  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe({
      next: (res) => {
        alert("Task completed");
        this.getAllTasks();
      },
      error: () => {
        alert("Error while deleting task!");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
