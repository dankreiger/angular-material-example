import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';

import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

/* layouts */
import { Items2Component } from './layout';

/* components */
import { InvoiceCalculatorComponent } from '../shared/invoice-calculator/invoice-calculator.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    Items2Component,
    InvoiceCalculatorComponent,
    DataTableComponent,
    DatePickerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    InvoiceCalculatorComponent
  ]
})
export class SharedModule {}
