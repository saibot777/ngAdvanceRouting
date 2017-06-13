import { Component } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './app/products/product-detail.component.html'
})
export class ProductDetailComponent {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private productService : ProductService) { }      

    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }

}
