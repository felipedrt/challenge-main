import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoComboOption, PoModalAction, PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { SqlAccessModeEnum } from 'src/enums/sql-access-mode';
import { CategoryManagement } from '../../models/category-management';
import { CategoryManagementService } from '../../service/category-management-service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  //#region Attributes

  //#region Public Attributes

  @ViewChild('modalConfirmation') modalConfirmation: PoModalComponent;
  @ViewChild('modalCategory') modalCategory: PoModalComponent;
  public columns: Array<PoTableColumn> = [];
  public actions: Array<PoTableAction> = [];
  public searchBy: Array<PoComboOption> = [];

  public selectedItem;
  public listCategories: CategoryManagement[] = [];

  public primaryActionConfirmationModal: PoModalAction = {
    action: () => {
      this.categoryManagementService.delete(this.selectedItem.id).subscribe((result) => {
        if (result.hasError) {
          this.poNotificationService.error(`Error to delete category | error: ${result.msgError}`);
        } else {
          this.poNotificationService.success('Category deleted with success!');
          setTimeout(() => {
            this.getCategories();
          }, 500);
        }
        this.modalConfirmation.close();
      });
    },
    label: 'Yes'
  };

  public secondaryActionConfirmationModal: PoModalAction = {
    action: () => {
      this.modalConfirmation.close();
    },
    label: 'No'
  };

  // Modal Category
  public modalCategoryTitle = '';
  public primaryActionModalCategory: PoModalAction = {
    action: () => {
      for (let i in this.categoryForm.controls) {
        this.categoryForm.controls[i].markAsTouched();
      };
  
      if (this.categoryForm.valid) {
        if (this.sqlAccessModeEnum == SqlAccessModeEnum.Insert) {
          this.insertCategory();
        } else if (this.sqlAccessModeEnum == SqlAccessModeEnum.Update) {
          this.updateCategory();
        }
      }
    },
    label: 'Save Category'
  };
  public secondaryActionModalCategory: PoModalAction = {
    action: () => {
      this.modalCategory.close();
    },
    label: 'Cancel'
  }
  public categoryForm: FormGroup;

  //#endregion

  //#region Private Attributes

  private sqlAccessModeEnum: SqlAccessModeEnum;
  private columnToSearch = '';

  //#endregion

  //#endregion

  //#region Constructor

  constructor(
    private categoryManagementService: CategoryManagementService,
    private poNotificationService: PoNotificationService,
    private formBuilder: FormBuilder) {
    }

  //#endregion

  //#region Lifecycle Events

  ngOnInit(): void {
    this.createCategoryForm();

    this.getCategories();
    this.createTableColumns();
    this.createActions();
    this.getColumnsToSearch();
  }

  //#endregion

  //#region Methods

  //#region Public Methods

  public btnNewCategory_onClick() {
    this.sqlAccessModeEnum = SqlAccessModeEnum.Insert;
    this.modalCategory.open();
    this.modalCategoryTitle = 'New Category'
  }

  public cbbSearchBy_change(ev: any) {
    this.columnToSearch = ev;
  }

  public searchItems(ev: any) {
    if (this.columnToSearch && ev) {
      const auxArray = this.listCategories.filter((d) =>
        d[this.columnToSearch]
          .toString()
          .toUpperCase()
          .includes(ev.toUpperCase()));

      if (auxArray) {
        this.listCategories = [...auxArray];
      }
    } else {
      this.getCategories();
    }
  }

  //#endregion

  //#region Private Methods

  private getCategories() {
    this.categoryManagementService.getAll().subscribe((data) => {
      this.listCategories = data.items as CategoryManagement[];
    });
  }

  private createTableColumns() {
    this.columns = [
      {
        property: 'id',
        label: 'Id',
      },
      {
        property: 'name',
        label: 'Category',
      },
    ];
  }

  private createActions() {
    this.actions = [{
      label: 'Edit',
      icon: 'po-icon-edit',
      action: (item) => {
        this.selectedItem = item;
        this.sqlAccessModeEnum = SqlAccessModeEnum.Update;
        this.modalCategory.open();
        
        this.categoryForm.patchValue({
          name: item.name
        });
        this.modalCategoryTitle = 'Edit Category'
      },
    }, {
      label: 'Remove',
      icon: 'po-icon-delete',
      action: (item) => {
        this.selectedItem = item;
        this.modalConfirmation.open();
      },
    }
  ];
  }

  private getColumnsToSearch() {
    this.searchBy = this.columns.map((item) => {
      return {
        value: item.property,
        label: item.label
      };
    });
  }

  // Modal Category
  private createCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  private insertCategory() {
    const category: CategoryManagement = {
      name: this.categoryForm.get('name').value
    };
    this.categoryManagementService.insert(category).subscribe((result) => {
      if (result.hasError) {
        this.poNotificationService.error(`Error to create category | error: ${result.msgError}`);
      } else {
        this.poNotificationService.success('Category created with success!');
        this.getCategories();
      }
    });
  }

  private updateCategory() {
    const category: CategoryManagement = {
      name: this.categoryForm.get('name').value
    };
    this.categoryManagementService.update(this.selectedItem.id, category).subscribe((result) => {
      if (result.hasError) {
        this.poNotificationService.error(`Error to update category | error: ${result.msgError}`);
      } else {
        this.poNotificationService.success('Category updated with success!');
        this.getCategories();
        this.modalCategory.close();
      }
    });
  }

  //#endregion

  //#endregion

}
