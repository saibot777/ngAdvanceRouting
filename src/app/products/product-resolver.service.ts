/**
 * Created by Stefan on 7/16/2017.
 */

import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {IProduct} from "./product";
import {Observable} from "rxjs/Observable";
import {ProductService} from "./product.service";

@Injectable()
export class ProductResolverService implements Resolve<IProduct> {

    constructor(private productService : ProductService,
                private router : Router) {}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<IProduct> {
        let id = +route.params['id'];
        if (isNaN(id)) {
            console.log(`Product id was not a number: ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product was not found: ${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`retrieval error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }
}