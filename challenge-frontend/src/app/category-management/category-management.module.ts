import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { PoButtonModule, PoFieldModule, PoModalModule, PoNotificationModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FormMessageValidationModule } from '../form-message-validation/form-message-validation.module';

@NgModule({
  declarations: [
    CategoryListComponent,
  ],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    PoTableModule,
    PoFieldModule,
    PoButtonModule,
    PoPageModule,
    ReactiveFormsModule,
    PoNotificationModule,
    PoModalModule,
    FormMessageValidationModule
  ]
})
export class CategoryManagementModule { }
