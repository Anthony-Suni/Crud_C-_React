using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class RatingContext : DbContext
    {
        public RatingContext(DbContextOptions<RatingContext> options) : base(options)
        {
        }

        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuraciones específicas de MovieContext si es necesario
            // ...

            modelBuilder.Entity<Rating>()
                .HasKey(r => new { r.UserId, r.MovieId }); // Definir clave primaria compuesta
        }
    }
}
