import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';

  displayedColumns: string[] = ['taskName', 'category', 'date', 'priority', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  OpenDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllTasks();
      }
    });
  }

  getAllTasks() {
    this.api.getTask().subscribe({next:(res) => {
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
      if (val == 'update') {
        this.getAllTasks();
      }
    });
  }

  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe((res: any) => {
        alert("Error while deleting task!");
        this.getAllTasks();
      },
      error => {
        alert("Something went wrong");
      })
  }

  editTaskStatus(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: {row}
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
