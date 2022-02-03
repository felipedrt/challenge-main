import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'deviceManagement',
    loadChildren: () =>
      import('./device-management/device-management.module').then((m) => m.DeviceManagementModule),
  }, {
    path: 'categoryManagement',
    loadChildren: () =>
      import('./category-management/category-management.module').then((m) => m.CategoryManagementModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
