import { Component, OnDestroy, OnInit } from '@angular/core';
import { map} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { getLocaleDayPeriods } from '@angular/common';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/shared/service/product.service';
import { Product } from 'src/app/shared/service/product';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
products$;
products:Product[];
filteredProducts:Product[];
subscription:Subscription;
dtOptions: DataTables.Settings = {};
//dtTrigger: Subject<any> = new Subject();
dtTrigger: Subject<any> = new Subject();

items:Product[];
 itemCount:number;
  constructor(private productService:ProductService) {

    this.products$ = productService.getProducts().snapshotChanges().pipe(map(items=>{
      return items.map((item)=>{

        let payload = JSON.parse(JSON.stringify(item['payload']))
        payload.key = item['key'];
        return payload;
      });
    }))

    this.subscription= this.products$.subscribe(products => {
      this.products = this.filteredProducts = products;
      this.getTableData(products);

      
    });

   }

  ngOnInit(): void {
  }

  private getTableData(products:Product[]){
    this.items =products;
    this.dtTrigger.next();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
