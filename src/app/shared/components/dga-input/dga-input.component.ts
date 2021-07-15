import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  @Input() options: any[] = [];
  @Output() value = new EventEmitter();
  filteredOptions: Observable<any[]>;
  dateType: string = "text";
  constructor() { }

  ngOnInit() {
    if (this.type === "autoComplete") {
      this.form.controls[this.controlName].valueChanges.subscribe(value => {
        this.value.emit(value);
      })
      this.filteredOptions = this.form.controls[this.controlName].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
  }

  private _filter(value: string): string[] {
    if (!value['surname'] && !value['name']) {
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue.toLowerCase()) || option.surname.toLowerCase().includes(filterValue.toLowerCase()));
    } else {
      const filterValue = value;
      return this.options.filter(option => option.name.includes(filterValue) || option.surname.includes(filterValue));
    }
  }

  public displayWith(option): string {
    return option ? (option['name'] + " " + option["surname"]) : option;
  }

  log(value) {
    console.log(value);
  }

  getSize(){
    if(this.placeholder === 'Comment'){
      return '16px';
    }
  }

}

interface KeyValue {
  key: string,
  value: Object
}