import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthBookRoutingModule } from './auth-book-routing.module';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [CommonModule, AuthBookRoutingModule, FormsModule],
})
export class AuthBookModule {}
