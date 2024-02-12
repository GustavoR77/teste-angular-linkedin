import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'cnpj', 'status', 'getdetails'];
  users: Users[] = [];

  constructor(private usersService: UserService, private router: Router) {}

  mobileCheck = navigator.userAgent;
  dataSource = new MatTableDataSource<Users>(this.users);
  itemsQty = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.usersService.getUsers().subscribe((data) => {
      if (data) {
        this.dataSource = data;
        this.itemsQty = data.length;
      }
    });
  }

  editUser(id: any) {
    this.usersService.getUsersByID(id);
    this.router.navigate(['/create-edit', id]);
  }

  mobileDevice() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        this.mobileCheck
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
}
