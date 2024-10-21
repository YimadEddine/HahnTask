import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AddTicketComponent } from './components/add-ticket/add-ticket.component';
import { FormsModule } from '@angular/forms';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { TicketsTableComponent } from './components/tickets-table/tickets-table.component';
import { UpdateTicketComponent } from './components/update-ticket/update-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTicketComponent,
    ErrorPageComponent,
    TicketsTableComponent,
    UpdateTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
