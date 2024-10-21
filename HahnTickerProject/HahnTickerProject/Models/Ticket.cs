using HahnTickerProject.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
namespace HahnTickerProject.Models
{
    public class Ticket
    {
        public int Id { get; set; } 
        public string Description { get; set; }
        public  string Status { get; set; }
        public DateTime Date {  get; set; }

    }


public static class TicketEndpoints
{
	public static void MapTicketEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Ticket").WithTags(nameof(Ticket));

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Tickets.ToListAsync();
        })
        .WithName("GetAllTickets")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Ticket>, NotFound>> (int id, AppDbContext db) =>
        {
            return await db.Tickets.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is Ticket model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetTicketById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, Ticket ticket, AppDbContext db) =>
        {
            var affected = await db.Tickets
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.Id, ticket.Id)
                  .SetProperty(m => m.Description, ticket.Description)
                  .SetProperty(m => m.Status, ticket.Status)
                  .SetProperty(m => m.Date, ticket.Date)
                  );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateTicket")
        .WithOpenApi();

        group.MapPost("/", async (Ticket ticket, AppDbContext db) =>
        {
            db.Tickets.Add(ticket);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Ticket/{ticket.Id}",ticket);
        })
        .WithName("CreateTicket")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, AppDbContext db) =>
        {
            var affected = await db.Tickets
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteTicket")
        .WithOpenApi();
    }
}}
