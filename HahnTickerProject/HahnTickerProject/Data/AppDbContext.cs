﻿using HahnTickerProject.Models;
using Microsoft.EntityFrameworkCore;

namespace HahnTickerProject.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }
        

    }
}

