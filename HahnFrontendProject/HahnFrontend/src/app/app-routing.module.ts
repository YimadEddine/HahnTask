import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { TicketsTableComponent } from './components/tickets-table/tickets-table.component';
import { UpdateTicketComponent } from './components/update-ticket/update-ticket.component';

const routes: Routes = [{ path: 'add', component: AddTicketComponent },
{path: 'tickets', component: TicketsTableComponent },
{ path: 'update/:id', component: UpdateTicketComponent },
{ path: '', component: TicketsTableComponent },
{ path: 'error', component: ErrorPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
