import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoComboOption, PoModalAction, PoModalComponent, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { SqlAccessModeEnum } from 'src/enums/sql-access-mode';
import { DeviceManagement } from '../../models/device-management';
import { DeviceManagementService } from '../../service/device-management.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  //#region Attributes

  //#region Public Attributes

  @ViewChild('modal') modal: PoModalComponent;
  public columns: Array<PoTableColumn> = [];
  public actions: Array<PoTableAction> = [];
  public searchBy: Array<PoComboOption> = [];

  public selectedItem;
  public listDevices: DeviceManagement[] = [];

  public primaryAction: PoModalAction = {
    action: () => {
      this.deviceManagementService.delete(this.selectedItem.id).subscribe((result) => {
        if (result.hasError) {
          this.poNotificationService.error(`Error to delete device | error: ${result.msgError}`);
        } else {
          this.poNotificationService.success('Device deleted with success!');
          setTimeout(() => {
            this.getDevices();
          }, 500);
        }
        this.modal.close();
      });
    },
    label: 'Yes'
  };

  secondaryAction: PoModalAction = {
    action: () => {
      this.modal.close();
    },
    label: 'No'
  };

  //#endregion

  //#region Private Attributes

  private columnToSearch = '';

  //#endregion

  //#endregion

  //#region Constructor

  constructor(
    private deviceManagementService: DeviceManagementService,
    private router: Router,
    private poNotificationService: PoNotificationService) {
    }

  //#endregion

  //#region Lifecycle Events

  ngOnInit(): void {
    this.getDevices();
    this.createTableColumns();
    this.createActions();
    this.getColumnsToSearch();
  }

  //#endregion

  //#region Methods

  //#region Public Methods

  public btnNewDevice_onClick() {
    this.router.navigate(['deviceManagement', 'new'], {
      state: {
        accessMode: SqlAccessModeEnum.Insert
      }
    });
  }

  public cbbSearchBy_change(ev: any) {
    this.columnToSearch = ev;
  }

  public searchItems(ev: any) {
    if (this.columnToSearch && ev) {
      const auxArray = this.listDevices.filter((d) =>
        d[this.columnToSearch]
          .toString()
          .toUpperCase()
          .includes(ev.toUpperCase()));

      if (auxArray) {
        this.listDevices = [...auxArray];
      }
    } else {
      this.getDevices();
    }
  }

  //#endregion

  //#region Private Methods

  private getDevices() {
    this.deviceManagementService.getAll().subscribe((data) => {
      this.listDevices = data.items as DeviceManagement[];
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
      {
        property: 'color',
        label: 'Color',
      },
      {
        property: 'partNumber',
        label: 'Part Number',
      },
    ];
  }

  private createActions() {
    this.actions = [{
      label: 'Edit',
      icon: 'po-icon-edit',
      action: (item) => {
        this.router.navigate(['deviceManagement', 'edit'], {
          state: {
            accessMode: SqlAccessModeEnum.Update,
            id: item.id
          }
        });
      },
    }, {
      label: 'Visualize',
      icon: 'po-icon-eye',
      action: (item) => {
        this.router.navigate(['deviceManagement', 'view'], {
          state: {
            accessMode: SqlAccessModeEnum.Select,
            id: item.id
          }
        });
      },
    }, {
      label: 'Remove',
      icon: 'po-icon-delete',
      action: (item) => {
        this.selectedItem = item;
        this.modal.open();
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

  //#endregion

  //#endregion
}
