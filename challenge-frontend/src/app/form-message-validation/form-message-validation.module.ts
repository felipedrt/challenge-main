import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMessageValidationComponent } from './form-message-validation.component';



@NgModule({
  declarations: [
    FormMessageValidationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormMessageValidationComponent
  ]
})
export class FormMessageValidationModule { }
