using HahnTickerProject.Data;
using HahnTickerProject.Models;
using System.Net.Sockets;

namespace HahnTickerProject.Repositories
{
    public class TicketsRepository
    {
        private readonly AppDbContext _context;
        public TicketsRepository(AppDbContext context)
        {
            _context= context;
        }
        public Ticket GetTicketById(int ticketId)
        {
            Ticket result = _context.Tickets.Where(t=>t.Id == ticketId).FirstOrDefault();
            return result;
        }
        public List<Ticket> GetAll()
        {
            return _context.Tickets.ToList();
        }
        public List<Ticket> GetAll(int pageNumber, int pageSize)
        {
            return _context.Tickets
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }
        public int DeleteTicket(int ticketId)
        {
            Ticket ticket = GetTicketById(ticketId);
            if (ticket == null) return 0;
            _context.Tickets.Remove(ticket);
            int result = _context.SaveChanges();
            return result;
        }
        public int AddTicket(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
           int result = _context.SaveChanges();
            return result;
        }
        public int UpdateTicket(Ticket ticket)
        {
            //_context.Tickets.Update(ticket);
            //int result = _context.SaveChanges();
            //return result;
            var existingTicket = _context.Tickets.Find(ticket.Id); // Find the existing entity in the context
            if (existingTicket != null)
            {
              
                existingTicket.Description = ticket.Description;
                existingTicket.Status = ticket.Status;


                return _context.SaveChanges();
            }

            return 0;
        }


    }
}
