import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { DeviceCrudComponent } from './components/device-crud/device-crud.component';
import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { PoDropdownModule, PoFieldModule, PoTableModule } from '@po-ui/ng-components';

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
  ],
})
export class DeviceManagementModule { }
