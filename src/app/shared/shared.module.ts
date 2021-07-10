import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DgaInputComponent } from './components/dga-input/dga-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [DgaInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    /*
     *Angular Material Modules 
    */
     MatDialogModule,
     MatIconModule,
     MatCardModule

  ],
  exports: [
    DgaInputComponent,
    ReactiveFormsModule,
    
    /*
     *Angular Material Modules 
    */
     MatDialogModule,
     MatIconModule,
     MatCardModule

  ]
})
export class SharedModule { }
