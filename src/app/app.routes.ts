import { Routes } from '@angular/router';
import { Loginpage } from './paginas/loginpage/loginpage';
import { Masterpage } from './paginas/masterpage/masterpage';
import { Customerpage } from './paginas/customerpage/customerpage';
import { Home } from './paginas/home/home';
import { Catalogpage } from './paginas/catalogpage/catalogpage';
import { Logoffpage } from './paginas/logoffpage/logoffpage';
import { Errorpage } from './paginas/errorpage/errorpage';

export const routes: Routes = [
  {path: 'login', component: Loginpage}, 
  {path: '', component: Masterpage, children:[
    {path: 'home', component: Home},
    {path: 'customer', component: Customerpage},
    {path: 'budgets', component: Catalogpage},
    {path: 'logoff', component: Logoffpage}
  ]},
  {path: '**', component: Errorpage}
];
