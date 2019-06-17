import {
  Component,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { DataTable } from 'src/app/core/models/DataTable.model';
import { DataTableService } from 'src/app/core/services/data-table.service';
import { ApiService } from 'src/app/core/services';
import { HttpParams } from '@angular/common/http';
import {
  itemOneColClasses,
  itemTwoColClasses
} from './invoice-calculator.data';
import { Customer } from 'src/app/core/models/Customer.model';
import { Order, OrderDetails } from 'src/app/core/models/Order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-invoice-calculator',
  templateUrl: './invoice-calculator.component.html',
  styleUrls: ['./invoice-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceCalculatorComponent implements AfterViewInit {
  @Input() apiPath: string;
  public data: DataTable;
  public orderDetails: OrderDetails;
  public currentItem: Customer;
  public showDetailsButtonVisible = false;
  public itemOneColClasses = itemOneColClasses;
  public itemTwoColClasses = itemTwoColClasses;
  public detailsVisible = false;

  @ViewChild('dataTable', { static: false }) dataTable;
  @ViewChild('layoutItems2', { static: false }) layoutItems2;

  constructor(
    private apiService: ApiService,
    private dataTableService: DataTableService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  toggleFormButton(item: Customer) {
    this.showDetailsButtonVisible = item.selected;
    if (item.selected) {
      this.currentItem = item;
    } else {
      this.currentItem = null;
    }
  }

  showCustomerDetails() {
    console.log(this.currentItem);
    const fromObject = { start_date: '2015-11-02', end_date: '2016_02_01' };

    // TODO - navigate page and perform http via resolver, maybe
    this.apiService
      .get(`/orders/${this.currentItem.id}`, new HttpParams({ fromObject }))
      .subscribe((res: Order[]) => {
        console.log(res);
        this.currentItem = null;
        this.showDetailsButtonVisible = false;
        this.itemOneColClasses = ['col-12', 'order-1'];
        this.itemTwoColClasses = ['col-12'];
        this.data = this.dataTableService.prepareOrderTableData(res);
        this.orderDetails = this.orderService.prepareOrderDetails(res);
        // this.cdr.detectChanges();
        this.detailsVisible = true;
        this.layoutItems2.reInit(
          this.itemOneColClasses,
          this.itemTwoColClasses
        );
        this.dataTable.reInit(this.data);
      });
  }

  ngAfterViewInit() {
    const fromObject = { start_date: '2015-11-02', end_date: '2016_02_01' };

    // unsubscribe not necessary for httpclient
    this.apiService
      .get(this.apiPath, new HttpParams({ fromObject }))
      .subscribe((res: Customer[]) => {
        this.data = this.dataTableService.normalizeCustomerData(res);
        this.cdr.markForCheck();
      });
  }
}
