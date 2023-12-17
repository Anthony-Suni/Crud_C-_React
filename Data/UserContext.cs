using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Puedes configurar aquí las relaciones, índices y otros detalles del modelo si es necesario.
            // Aquí se muestra un ejemplo simple de configuración:
            modelBuilder.Entity<User>()
                .HasMany(u => u.Movies)
                .WithOne()
                .HasForeignKey(m => m.UserId); // Asume que hay una propiedad UserId en la clase Movie
        }
    }
}
