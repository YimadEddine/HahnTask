using HahnTickerProject.Data;
using HahnTickerProject.Models;
using HahnTickerProject.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HahnTickerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly TicketsRepository _repo;
        public TicketsController(AppDbContext context)
        {
            this._repo = new TicketsRepository(context);
        }
        [HttpGet("{id}")]
        public ActionResult<Ticket> GetTicket(int id)
        {

            Ticket result = _repo.GetTicketById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        //[HttpGet]
        //public ActionResult<IEnumerable<Ticket>> GetTickets()
        //{
        //    List<Ticket> tickets = _repo.GetAll();
        //    if (tickets.Count > 0 && tickets != null)
        //    {
        //        return Ok(tickets);
        //    }
        //    return NotFound();
        //}
        [HttpGet]
        public ActionResult<IEnumerable<Ticket>> GetTickets(int pageNumber = 1, int pageSize = 10)
        {
            List<Ticket> tickets = _repo.GetAll(pageNumber, pageSize);
            if (tickets.Count > 0)
            {
                return Ok(tickets);
            }
            return NoContent();
        }

        [HttpPost]
        public ActionResult<Ticket> AddTicket(Ticket ticket)
        {
            ticket.Date = DateTime.Now;
            int result = _repo.AddTicket(ticket);
            if (result != 0) return Ok();
            return Conflict();
        }



        [HttpDelete("{id:int}")]
        public IActionResult DeleteTicket(int id)
        {
            int result= _repo.DeleteTicket(id);
            if (result != 0)
            {
                return Ok();
            } 


            return NotFound();
        }
        [HttpPut]
        public IActionResult UpdateTicket( Ticket ticket)
        {
            int result= _repo.UpdateTicket(ticket);
            if (result ==0)
            {
                return NotFound();
            }




            return Ok();
        }
    }
}
