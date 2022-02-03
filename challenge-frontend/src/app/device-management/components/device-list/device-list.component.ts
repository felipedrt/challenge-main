import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoComboOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
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

  public columns: Array<PoTableColumn> = [];
  public actions: Array<PoTableAction> = [];
  public searchBy: Array<PoComboOption> = [];

  public listDevices: DeviceManagement[] = [];

  //#endregion

  //#region Private Attributes

  private columnToSearch = '';

  //#endregion

  //#endregion

  //#region Constructor

  constructor(
    private deviceManagementService: DeviceManagementService,
    private router: Router) {
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
      this.listDevices = data.items;
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
        label: 'Categoria',
      },
      {
        property: 'color',
        label: 'Cor',
      },
      {
        property: 'partNumber',
        label: 'Número de Série',
      },
    ];
  }

  private createActions() {
    this.actions = [{
      label: 'Editar',
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
      label: 'Visualizar',
      icon: 'po-icon-eye',
      action: (item) => {
      },
    }, {
      label: 'Remover',
      icon: 'po-icon-delete',
      action: (item) => {
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
