import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import { ListGroupComponent } from './components/list-group/list-group.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import {TodosModule} from "../todos/todos.module";


@NgModule({
  declarations: [
    CreateGroupComponent,
    FormGroupComponent,
    ListGroupComponent,
    EditGroupComponent
  ],
    imports: [
        CommonModule,
        GroupsRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule,
        MatListModule,
        MatSelectModule,
        TodosModule
    ]
})
export class GroupsModule { }
