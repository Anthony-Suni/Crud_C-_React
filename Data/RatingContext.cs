using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class RatingContext : DbContext
    {
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rating>()
                .HasKey(r => new { r.UserId, r.MovieId });
        }
    }
}
