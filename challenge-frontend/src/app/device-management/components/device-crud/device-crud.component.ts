import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SqlAccessModeEnum } from 'src/enums/sql-access-mode';

@Component({
  selector: 'app-device-crud',
  templateUrl: './device-crud.component.html',
  styleUrls: ['./device-crud.component.scss']
})
export class DeviceCrudComponent implements OnInit {

  public pageTitle = 'Device Management';
  private sqlAccessModeEnum: SqlAccessModeEnum;

  public deviceForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.sqlAccessModeEnum = this.router.getCurrentNavigation().extras.state?.accessMode;
  }

  public createDeviceForm() {
    this.deviceForm = this.formBuilder.group({
      categoryId: [null, Validators.required],
      color: [null, Validators.required],
      partNumber: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.createDeviceForm();
    switch (this.sqlAccessModeEnum) {
      case SqlAccessModeEnum.Insert:
        this.pageTitle += ' - New';
        break;
      case SqlAccessModeEnum.Update:
        this.pageTitle += ' - Edit';
        break;
      case SqlAccessModeEnum.Select:
        this.pageTitle += ' - Vizualization';
        break;
    }
  }

}
