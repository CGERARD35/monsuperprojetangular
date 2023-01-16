import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateTodoComponent} from "./components/create-todo/create-todo.component";
import {ListTodosComponent} from "./components/list-todos/list-todos.component";
import {EditTodoComponent} from "./components/edit-todo/edit-todo.component";
import {FormTodoComponent} from "./components/form-todo/form-todo.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {TodosRoutingModule} from "./todos-routing.module";



@NgModule({
    declarations: [
        ListTodosComponent,
        CreateTodoComponent,
        EditTodoComponent,
        FormTodoComponent
    ],
    exports: [
        EditTodoComponent,
        ListTodosComponent
    ],
    imports: [
        TodosRoutingModule,
        // Angular
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        // Third party
        // NgxTranslate
        TranslateModule,
        //Material
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        MatButtonModule,
        MatNativeDateModule,
        MatListModule
    ]
})
export class TodosModule { }
