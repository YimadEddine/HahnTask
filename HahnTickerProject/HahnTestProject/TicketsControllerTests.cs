using HahnTickerProject.Controllers;
using HahnTickerProject.Data;
using HahnTickerProject.Models;
using HahnTickerProject.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HahnTestProject
{/// <summary>
/// test class for the tickets controller with a few test cases that cover the essential parts
/// </summary>
    public class TicketsControllerTests
    {
        private readonly TicketsController _controller;
        private readonly AppDbContext _context;

        public TicketsControllerTests()
        {
            // in memory database
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new AppDbContext(options);
            _controller = new TicketsController(_context);
        }

        [Fact]
        public void GetTicket_ValidId_ReturnsTicket()
        {
  
            var ticket = new Ticket { Id = 1, Description = "Test Ticket", Status = "Open" };
            _context.Tickets.Add(ticket);
            _context.SaveChanges();

            var result = _controller.GetTicket(1);

            var okResult = Assert.IsType<OkObjectResult>(result.Result); 
            var returnedTicket = Assert.IsType<Ticket>(okResult.Value);

            Assert.NotNull(returnedTicket);
            Assert.Equal("Test Ticket", returnedTicket.Description);
            Assert.Equal("Open", returnedTicket.Status);
        }

        [Fact]
        public void GetTicket_InvalidId_ReturnsNotFound()
        {

            var result = _controller.GetTicket(97845); //id doesnt exist

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public void AddTicket_ValidTicket_ReturnsOk()
        {
 
            var ticket = new Ticket { Description = "new ticket", Status = "Open" };

            var result = _controller.AddTicket(ticket);
            var okResult = Assert.IsType<OkResult>(result.Result); 
            Assert.Equal(1, _context.Tickets.Count());
        }

        [Fact]
        public void DeleteTicket_ValidId_ReturnsOk()
        {

            var ticket = new Ticket { Id = 1, Description = "ticket to delete", Status="Open" };
            _context.Tickets.Add(ticket);
            _context.SaveChanges();

            var result = _controller.DeleteTicket(1) as OkResult;


            Assert.IsType<OkResult>(result);
            Assert.Equal(0, _context.Tickets.Count());
        }

        [Fact]
        public void DeleteTicket_InvalidId_ReturnsNotFound()
        {

            var result = _controller.DeleteTicket(94517); // non existant di

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void UpdateTicket_ValidTicket_ReturnsOk()
        {
         
            var ticket = new Ticket { Id = 1, Description = "original ticket", Status = "Open" };
            _context.Tickets.Add(ticket);
            _context.SaveChanges();

     
            var updatedTicket = new Ticket { Id = 1, Description = "updated ticket", Status = "Closed" };


            var result = _controller.UpdateTicket(updatedTicket);
            var okResult = Assert.IsType<OkResult>(result); 

            
            var ticketInDb = _context.Tickets.Find(1); 
            Assert.NotNull(ticketInDb); 
            Assert.Equal("updated ticket", ticketInDb.Description);
            Assert.Equal("Closed", ticketInDb.Status);
        }


        [Fact]
        public void UpdateTicket_InvalidId_ReturnsNotFound()
        {

            var ticket = new Ticket { Id = 96249, Description = "non exist ticket" };

            var result = _controller.UpdateTicket(ticket);


            Assert.IsType<NotFoundResult>(result);
        }
    }
}
