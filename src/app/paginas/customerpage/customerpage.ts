import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PoInfoModule, PoListViewModule, PoLoadingModule, PoModalComponent, PoModalModule, PoPageFilter, PoPageModule } from '@po-ui/ng-components';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customer';

@Component({
  selector: 'app-customerpage',
  imports: [PoListViewModule, PoPageModule, PoInfoModule, PoModalModule, PoLoadingModule],
  templateUrl: './customerpage.html',
  styleUrl: './customerpage.css',
})
export class Customerpage implements OnInit{

  customerList: Array<Customer> = []
  customerListFiltered: Array<Customer> = []
  #customerService = inject(CustomerService)
  detailCustomer: Customer = new Customer()
  filterSettings: PoPageFilter = { placeholder: 'Filtrar por nome ou endereco', action: this.customerFilter.bind(this)}

  @ViewChild('modalCustomer') modalCustomerElement!: PoModalComponent

  ngOnInit():void {
    this.loadData()
  }

  loadData():void{
    let req = this.#customerService.getCustomers()
    let itens: Array<Customer> = []

    req.subscribe({
      next(value: any){
        value.items.forEach((el: Customer) => {
          itens.push(el)
        });
      },
      error(error){
        console.log(`error req customer list`, error)
      },
      complete() {
        //console.log(`complete req customer list`)
      }
    })

    this.customerList = itens
    this.customerListFiltered = itens

    console.log(`customer list: `, this.customerListFiltered)
  }

  showDetail(customer: Customer): void {
    this.detailCustomer = customer;
    this.modalCustomerElement.open();
  }

  customerFilter(content: string){
    this.customerListFiltered = this.customerList.filter(customer => 
    customer.nome.indexOf(content.toUpperCase()) >= 0 || 
    customer.endereco.indexOf(content.toUpperCase()) >= 0)
    console.log(`testessss`)
  }

}
