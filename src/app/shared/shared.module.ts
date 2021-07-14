import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DgaInputComponent } from "./components/dga-input/dga-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { HttpResponseDialogComponent } from "./components/http-response-dialog/http-response-dialog.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    DgaInputComponent,
    SpinnerComponent,
    HttpResponseDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    /*
     *Angular Material Modules
     */
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatSlideToggleModule,
  ],
  exports: [
    DgaInputComponent,
    ReactiveFormsModule,

    /*
     *Angular Material Modules
     */
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatListModule,
    HttpResponseDialogComponent,
    MatTabsModule,
    MatSlideToggleModule,

    SpinnerComponent,
  ],
  entryComponents: [HttpResponseDialogComponent],
})
export class SharedModule {}
