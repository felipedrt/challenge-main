import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceCrudComponent } from './components/device-crud/device-crud.component';
import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { PoButtonModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
})
export class DeviceManagementModule { }
