import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'tel',
    'email',
    'endereco',
    'status',
    'delete',
    'getdetails',
  ];
  //displayedColumns: string[] = ['name', 'tel', 'email', 'endereco', 'getdetails'];
  users: Users[] = [];

  constructor(
    private usersService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  mobileCheck = navigator.userAgent;
  dataSource = new MatTableDataSource<Users>(this.users);
  itemsQty = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
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

  deleteUser(id: any) {
    this.usersService.deleteUser(id).subscribe(() => {
      this.getUser();
    });
    this.toastr.success('Usuário deletado com sucesso!');
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
