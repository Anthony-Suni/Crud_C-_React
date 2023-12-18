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

    }
}
