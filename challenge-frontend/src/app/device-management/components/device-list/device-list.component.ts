import { Component, OnInit } from '@angular/core';
import { PoComboOption, PoSelectOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

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

  public listDevices = [];

  //#endregion

  //#region Private Attributes

  private columnToSearch = '';

  //#endregion

  //#endregion

  //#region Constructor

  constructor() { }

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

  public cbbSearchBy_change(ev: any) {
    this.columnToSearch = ev;
  }

  public searchItems(ev: any) {
    console.log(ev);
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
    this.listDevices = [
      {
        id: 1,
        name: 'Teste 1',
        color: 'red',
        partNumber: 123,
      }, {
        id: 2,
        name: 'Teste 2',
        color: 'black',
        partNumber: 456,
      }, {
        id: 3,
        name: 'Teste 3',
        color: 'purple',
        partNumber: 789,
      },
    ];
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
