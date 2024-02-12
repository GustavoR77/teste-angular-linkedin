import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/models/users';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css'],
})
export class CreateEditComponent implements OnInit {
  mobileCheck = navigator.userAgent;
  invalidForm = false;
  id = this.route.snapshot.params['id'];
  pageTitle = '';

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cnpj: new FormControl('', Validators.required),
    status: new FormControl('Ativo', Validators.required),
  });

  constructor(
    private usersService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.id !== undefined) {
      this.usersService.getUsersByID(this.id).subscribe((data) => {
        if (data) {
          this.userForm = new FormGroup({
            name: new FormControl(data.name, Validators.required),
            cnpj: new FormControl(data.cnpj, Validators.required),
            status: new FormControl(data.status, Validators.required),
          });
        }
      });
      this.pageTitle = 'Editar Cliente';
    } else {
      this.pageTitle = 'Novo Cliente';
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.invalidForm = false;
      const obj = {
        name: this.userForm.value.name,
        cnpj: this.userForm.value.cnpj,
        status: this.userForm.value.status,
      };
      if (this.pageTitle === 'Novo Cliente') {
        this.usersService.postUsers(obj).subscribe((data) => {
          if (data) {
            this.toastr.success('Usuário criado com sucesso!');
            this.router.navigate(['']);
          }
        });
      } else {
        this.usersService.putUsers(obj, this.id).subscribe((data) => {
          if (data) {
            this.toastr.success('Usuário editado com sucesso!');
            this.router.navigate(['']);
          }
        });
      }
    } else {
      this.invalidForm = true;
    }
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
