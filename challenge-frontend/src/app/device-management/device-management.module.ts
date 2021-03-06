import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceCrudComponent } from './components/device-crud/device-crud.component';
import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { PoButtonModule, PoFieldModule, PoModalModule, PoNotificationModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMessageValidationModule } from '../form-message-validation/form-message-validation.module';

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceCrudComponent,
  ],
  imports: [
    CommonModule,
    DeviceManagementRoutingModule,
    PoTableModule,
    PoFieldModule,
    PoButtonModule,
    PoPageModule,
    ReactiveFormsModule,
    PoNotificationModule,
    PoModalModule,
    FormMessageValidationModule
  ],
})
export class DeviceManagementModule { }
