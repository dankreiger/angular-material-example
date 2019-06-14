import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { ApiService } from '../../core/services';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/core/models/Customer.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements AfterViewInit {
  @Input() tableData: object;

  public displayedColumns: string[] = [];
  public columnsToDisplay: string[] = [];
  public customerData: MatTableDataSource<Customer>;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

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
