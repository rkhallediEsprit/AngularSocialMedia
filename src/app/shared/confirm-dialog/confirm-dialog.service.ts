import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { DataConfirm } from "./modelConfirm";
@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public open(options: DataConfirm) {
    options.type;
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        type: options.type || "failed",
        icon: options.icon,
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        iconCancel: options.iconCancel,
        iconConfirm: options.iconConfirm,
        sizeConfirm: options.sizeConfirm || "large",
      },
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
