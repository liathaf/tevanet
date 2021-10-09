import { Pipe, PipeTransform } from '@angular/core';

import { cartProduct } from '../models/cartProduct';

@Pipe({
  name: 'calcPayment'
})
export class CalcPaymentPipe implements PipeTransform {


  transform(cartProducts: cartProduct[]): number {
    let totalPayment = 0;
    cartProducts.forEach(cartProduct => {
      const paymentPerProduct = cartProduct.product.price;
      const productQuantity = cartProduct.quantity;
      totalPayment += paymentPerProduct * productQuantity;
    });

    return totalPayment;
  }

}
