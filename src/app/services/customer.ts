import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Customer } from '../classes/customer';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  #http = inject(HttpClient);
  #url = environment.url;
  #customerList$ = new Subject<Customer[]>();
  #customerSelected$ = new Subject<Customer>();

  constructor() {}

  public getCustomers(): Observable<Array<Customer>> {
    
    let url: string = `${this.#url}/curso/api/tabelas/sa1`
    
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:Scarnox.*4'),
      'TenantId': '99,01'
    });

    return this.#http.get<Array<Customer>>(url, {headers});

  }

}
