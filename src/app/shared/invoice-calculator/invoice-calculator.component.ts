import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ApiService } from '../../core/services';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/core/models/Customer.model';

@Component({
  selector: 'app-invoice-calculator',
  templateUrl: './invoice-calculator.component.html',
  styleUrls: ['./invoice-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceCalculatorComponent implements AfterViewInit {
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  customerData: MatTableDataSource<Customer>;

  applyFilter(filterValue: string) {
    this.customerData.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row) {
    console.log(row);
  }

  ngAfterViewInit() {
    const fromObject = { start_date: '2015-11-02', end_date: '2016_02_01' };
    this.apiService
      .get('/customers', new HttpParams({ fromObject }))
      .subscribe((res: Customer[]) => {
        this.displayedColumns = Object.keys(res[0]);
        this.columnsToDisplay = this.displayedColumns.slice();
        this.customerData = new MatTableDataSource(res);
        this.cdr.markForCheck();
      });
  }
}
