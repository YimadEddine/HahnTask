
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/models/ticket';
import { TicketsService } from 'src/services/tickets.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent {
  ticket= new Ticket(); 

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketsService,
    private router:Router
  ) {}

  ngOnInit() {
   
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("ticket id:"+ticketId );
    this.ticketService.GetTicket(ticketId).subscribe(data => {
      this.ticket = data as Ticket;
      console.log("ticket :"+JSON.stringify(this.ticket ));
    },error=>{
      this.router.navigate(['/error']);
    });
  }
 
  DescriptionError = '';
  StatusError = '';

  onSubmit() {
    if(this.ticket.description == "" || this.ticket.description==null) this.DescriptionError = "Description Required"
    if(this.ticket.status == "" || this.ticket.status==null) this.StatusError = "Please choose an option"
    if (this.ticket.description && this.ticket.status) {

     this.ticketService.UpdateTicket(this.ticket).subscribe(response=>{
        console.log(JSON.stringify(response));
        Swal.fire({
          title: 'Success!',
          text: 'Ticket updated successfully',
          icon: 'success',
          timer: 1500
        });
        this.router.navigate(['/tickets']);
     },error=>{
      console.log(JSON.stringify(error));
      Swal.fire({
        title: 'Error!',
        text: 'Error occured while updating your ticket',
        icon: 'error',
        timer: 1500
      });
    
     })
      
    } 
  }
}
