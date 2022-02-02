import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceCrudComponent } from './components/device-crud/device-crud.component';
import { DeviceListComponent } from './components/device-list/device-list.component';

export const managementDevicesRoutes: Routes = [
    {
        path: '',
        component: DeviceListComponent,
    }, {
        path: 'new',
        component: DeviceCrudComponent,
    }, {
        path: 'edit',
        component: DeviceCrudComponent,
    }, {
        path: 'view',
        component: DeviceCrudComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(managementDevicesRoutes)],
    exports: [RouterModule],
})
export class DeviceManagementRoutingModule {}
