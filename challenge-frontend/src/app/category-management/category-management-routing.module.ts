import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';

export const managementCategoriesRoutes: Routes = [
    {
        path: '',
        component: CategoryListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(managementCategoriesRoutes)],
    exports: [RouterModule],
})
export class CategoryManagementRoutingModule {}
