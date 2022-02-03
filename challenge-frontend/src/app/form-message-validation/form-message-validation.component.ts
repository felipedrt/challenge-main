import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-message-validation',
  templateUrl: './form-message-validation.component.html',
  styleUrls: ['./form-message-validation.component.scss']
})
export class FormMessageValidationComponent implements OnInit {

  @Input() message = '';

  constructor() { }

  ngOnInit(): void {
  }

}
