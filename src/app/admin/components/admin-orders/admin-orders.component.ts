import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { UserOrder } from 'src/app/shared/models/user-order';
import { AuthService } from 'src/app/shared/service/auth.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit{
 
orderItems:UserOrder[] =[];
userId;
  constructor(private orderService:OrderService, private user:AuthService) { 
  }

   ngOnInit(){
     this.user.user$.subscribe(user => this.userId = user.uid);

      this.orderService.getCartItems().valueChanges().subscribe((items:{[orderId:string]:Order}) => {
       
        for (let userId in items){
          let item = items[userId];
          this.orderItems.push(new UserOrder(userId,item));
        }
      });

  }

}
