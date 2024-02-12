import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableListComponent } from './components/table-list/table-list.component';
import { CreateEditComponent } from './components/create-edit/create-edit.component';

const routes: Routes = [
  { path: '', component: TableListComponent },
  { path: 'create-edit', component: CreateEditComponent },
  { path: 'create-edit/:id', component: CreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
