import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColmeiaComponent } from './colmeia/colmeia.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OutrosModule } from '../outros/outros.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogColmeiaFormComponent } from './dialog-colmeia-form/dialog-colmeia-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogColmeiaDeleteComponent } from './dialog-colmeia-delete/dialog-colmeia-delete.component';
import { DialogColmeiaViewComponent } from './dialog-colmeia-view/dialog-colmeia-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ColmeiaComponent,
    DialogColmeiaFormComponent,
    DialogColmeiaDeleteComponent,
    DialogColmeiaViewComponent
  ],
  imports: [
    CommonModule,
    OutrosModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ColmeiaModule { }