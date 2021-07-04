import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DgaInputComponent } from './components/dga-input/dga-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';




@NgModule({
  declarations: [DgaInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    /*
     *Angular Material Modules 
    */
     MatDialogModule,
     MatIconModule

  ],
  exports: [
    DgaInputComponent,
    ReactiveFormsModule,
    
    /*
     *Angular Material Modules 
    */
     MatDialogModule,
     MatIconModule

  ]
})
export class SharedModule { }
