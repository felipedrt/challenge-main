import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SqlAccessModeEnum } from 'src/enums/sql-access-mode';
import { DeviceManagementService } from '../../service/device-management.service';
import { PoComboOption, PoNotificationService } from '@po-ui/ng-components';
import { CategoryManagement } from '../../models/category-management';
import { DeviceManagement } from '../../models/device-management';

@Component({
  selector: 'app-device-crud',
  templateUrl: './device-crud.component.html',
  styleUrls: ['./device-crud.component.scss']
})
export class DeviceCrudComponent implements OnInit {

  //#region Attributes

  //#region Public Attributes

  public pageTitle = 'Device Management';
  private sqlAccessModeEnum: SqlAccessModeEnum;

  public deviceForm: FormGroup;
  public listCategories: PoComboOption[];

  public disableCategoryId = false;
  public disableColor = false;
  public disablePartNumber = false;
  public showSaveButton = true;

  //#endregion

  //#region Private Attributes

  private id = 0;

  //#endregion

  //#endregion

  //#region Constructor

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private deviceManagementService: DeviceManagementService,
    private poNotificationService: PoNotificationService) {
    this.sqlAccessModeEnum = this.router.getCurrentNavigation().extras.state?.accessMode;
    this.id = this.router.getCurrentNavigation().extras.state?.id;
  }

  //#endregion

  //#region Lifecycle Events

  ngOnInit(): void {
    this.createDeviceForm();
    this.getCategories();

    switch (this.sqlAccessModeEnum) {
      //#region Insert Mode

      case SqlAccessModeEnum.Insert:
        this.pageTitle += ' - New';
        break;

      //#endregion

      //#region Update Mode

      case SqlAccessModeEnum.Update:
        this.pageTitle += ' - Edit';
        this.setFormValue();
        break;

      //#endregion

      //#region Select Mode

      case SqlAccessModeEnum.Select:
        this.pageTitle += ' - Vizualization';
        this.disableFields();
        this.showSaveButton = false;
        this.setFormValue();
        break;

      //#endregion
    }
  }

  //#endregion

  //#region Methods

  //#region Public Methods

  public btnBack_onClick() {
    this.router.navigate(['/deviceManagement']);
  }

  public btnSave_onClick() {
    for (let i in this.deviceForm.controls) {
      this.deviceForm.controls[i].markAsTouched();
    };

    if (this.deviceForm.valid) {
      const device = this.getDeviceObject();
      if (this.sqlAccessModeEnum == SqlAccessModeEnum.Insert) {
        this.deviceManagementService.insert(device).subscribe((result) => {
          if (result.hasError) {
            this.poNotificationService.error(`Error to created device | error: ${result.msgError}`);
          } else {
            this.poNotificationService.success('Device created with success!');
            setTimeout(() => {
              this.deviceForm.reset();
            }, 1000);
          }
        })
      } else if (this.sqlAccessModeEnum == SqlAccessModeEnum.Update) {
        this.deviceManagementService.Update(this.id, device).subscribe((result) => {
          if (result.hasError) {
            this.poNotificationService.error(`Error to update device | error: ${result.msgError}`);
          } else {
            this.poNotificationService.success('Device updated with success!');
            setTimeout(() => {
              this.router.navigate(['/deviceManagement']);
            }, 1000);
          }
        })
      }
    }
  }

  //#endregion

  //#region Private Methods

  private negativeValidator(control: AbstractControl) {
    const valor = control.value as string;
    if (valor?.toString().includes('-')) {
      return {
        negative: true
      }
    } else {
      return null;
    }
  }

  private createDeviceForm() {
    this.deviceForm = this.formBuilder.group({
      categoryId: [null, Validators.required],
      color: [null, Validators.required],
      partNumber: [null, [Validators.required, this.negativeValidator]],
    });
  }

  private getCategories() {
    this.deviceManagementService.getCategories().subscribe(({items}) => {
      items = items as CategoryManagement[];
      this.listCategories = items.map((category) => {
        return {
          value: category.id,
          label: category.name
        }
      })
    })
  }

  private setFormValue() {
    this.deviceManagementService.getById(this.id).subscribe((item) => {
      const device = item.items as DeviceManagement;
      this.deviceForm.patchValue({
        categoryId: device.categoryId,
        color: device.color,
        partNumber: device.partNumber,
      })
    })
  }

  private disableFields() {
    this.disableCategoryId = true;
    this.disableColor = true;
    this.disablePartNumber = true;
  }

  private getDeviceObject() {
    const device: DeviceManagement = {
      categoryId: this.deviceForm.get('categoryId').value,
      color: this.deviceForm.get('color').value,
      partNumber: this.deviceForm.get('partNumber').value,
    }
    return device;
  }

  //#endregion

  //#endregion
}
