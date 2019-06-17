import { Injectable } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { DataTable } from '../models/DataTable.model';
import { Customer } from '../models/Customer.model';
import { Order, OrderComposed, OrderItem } from '../models/Order.model';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class DataTableService {
  constructor(private orderService: OrderService) {}
  normalizeCustomerData(data: Customer[]): DataTable {
    const columnsToDisplay = Object.keys(data[0]).slice();
    const tableData = new MatTableDataSource(data);

    return { columnsToDisplay, tableData };
  }

  prepareOrderTableData(data: Order[]): DataTable {
    const columnsToDisplay = [
      'id',
      'name',
      'email',
      'total_price',
      'order_date',
      'items',
      'delivery_details'
    ].slice();
    const newData = this.orderService.normalizeOrderData(data);
    const tableData = new MatTableDataSource(newData);

    return { columnsToDisplay, tableData };
  }
}
