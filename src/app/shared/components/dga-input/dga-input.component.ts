import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dga-input',
  templateUrl: './dga-input.component.html',
  styleUrls: ['./dga-input.component.scss']
})
export class DgaInputComponent implements OnInit {


  @Input() type: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() side: string;
  @Input() widthClass: string;
  @Input() selectOptions: string[] | KeyValue[];
  @Input() radioInputs: string[] | KeyValue[];
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() styles :object;
  dateType: string = "text";
  constructor() { }

  ngOnInit() {    
  }

  log(){
    console.log(this.form.controls[this.controlName].value);    
  }

}

interface KeyValue {
  key: string,
  value: Object
}