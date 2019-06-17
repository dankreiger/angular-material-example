import { Injectable } from '@angular/core';
import {
  Order,
  OrderComposed,
  OrderItem,
  OrderDetails
} from '../models/Order.model';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  normalizeOrderData(data: Order[]): OrderComposed[] {
    return data.map((order: Order) => {
      let composedOrderData: any = {};
      composedOrderData['id'] = order.id;
      composedOrderData['name'] = order.recipient.name;
      composedOrderData['email'] = order.recipient.email;
      composedOrderData['total_price'] = order.items.reduce(
        (acc: string, item: OrderItem) => {
          const { amount, currency } = item.total_price;
          return `${parseFloat(acc) + parseFloat(amount)} ${currency}`;
        },
        `0`
      );
      composedOrderData['order_date'] = new Date(
        order.created_at
      ).toUTCString();

      composedOrderData['items'] = order.items
        .map(item => item.name)
        .join(', ')
        .toString();

      composedOrderData[
        'delivery_details'
      ] = `${order.delivery.courier}: ${order.delivery.method}`;
      return composedOrderData;
    });
  }

  makeReadableDate(date: Date): string {
    return moment(date).format('MMMM Do YYYY');
  }

  prepareOrderDetails(data: Order[]): OrderDetails {
    const startDate = data[data.length - 1].created_at;
    const endDate = data[0].created_at;
    const oldestDate = this.makeReadableDate(startDate);
    const newestDate = this.makeReadableDate(endDate);

    const invoiceAmount: number = data.reduce(
      (acc: number, order: Order): number => {
        return acc + parseFloat(order.charge_customer.total_price);
      },
      0
    );
    const invoiceCurrency = data[0].charge_customer.currency;
    const totalAmountToInvoice = `${invoiceAmount} ${invoiceCurrency}`;

    const orderDetails: OrderDetails = {
      dateRange: `${oldestDate} - ${newestDate}`,
      numberOfDays: moment(endDate).diff(moment(startDate), 'days'),
      totalAmountToInvoice,
      numberOfOrders: data.length
    };
    return orderDetails;
  }
}
