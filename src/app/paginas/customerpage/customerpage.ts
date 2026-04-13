import { Component, inject, OnInit, ViewChild} from '@angular/core';
import { PoBreadcrumbModule, PoInfoModule, PoListViewModule, PoLoadingModule, PoModalComponent, PoModalModule, PoPageFilter, PoPageModule, PoPageSlideModule } from '@po-ui/ng-components';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customer';
//import { Subject } from 'rxjs';

@Component({
  selector: 'app-customerpage',
  standalone: true,
  imports: [PoPageModule,PoListViewModule,PoInfoModule,PoModalModule,PoLoadingModule,PoBreadcrumbModule,PoPageSlideModule],
  templateUrl: './customerpage.html',
  styleUrl: './customerpage.css'
})
export class Customerpage implements OnInit{

    isLoading: boolean = true
    customerList: Array<Customer> = []
    customerListFiltered: Array<Customer> = []
    detailCustomer: Customer = new Customer()
    #customerService = inject(CustomerService)
    filterSettings: PoPageFilter = {placeholder: "Filtrar por nome ou endereco", action: this.customerFilter.bind(this)}

    @ViewChild('modalCustomer') modalCustomerElement!: PoModalComponent;

    ngOnInit(): void {
      this.loadData()
    }

    loadData():void {
      
      let req = this.#customerService.getCustomers()
      let itens: Array<Customer> = []
      const hideload = () => this.isLoading = false;

      req.subscribe({
        next(value: any) {
          value.items.forEach((el: Customer) => itens.push(el));
          hideload()
        },
        error(err) {
          //console.log(`error req customer`,err)
        },
        complete() {
          //console.log(`complete customer list`)
        },
      })

      this.customerList = itens
      this.customerListFiltered = itens
      // this.#customerService.setListCustomer(itens)

    }

    showDetail(customer: Customer):void {
      this.detailCustomer = customer;
      this.modalCustomerElement.open();
    }

    customerFilter(content:string):void {
      console.log(`teste de filtro`)
      this.customerListFiltered = this.customerList.filter(customer => 
        customer.nome.indexOf(content.toUpperCase()) >= 0 || 
        customer.endereco.indexOf(content.toUpperCase()) >= 0)
    }
}
