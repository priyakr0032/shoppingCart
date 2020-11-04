import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/service/auth.service';
import { OrderService } from 'shared/service/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent  {
userId;
userOrders$;
userSubscription:Subscription;
  constructor(private authService:AuthService,
    private orderService:OrderService) { 
       this.userSubscription  = authService.user$.subscribe(s=>this.userId =s.uid);
       this.userOrders$ =orderService.getUserOrders(this.userId);
    }

  ngOnInit() {}

}
