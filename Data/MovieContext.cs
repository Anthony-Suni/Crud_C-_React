using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }

        // Puedes agregar más configuraciones aquí según sea necesario
    }
}
