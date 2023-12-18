using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("movies")]
    public class Movie
    {
        [Key]
        [Column("movieId")]
        public int MovieId { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("genres")]
        public string? Genres { get; set; }

        [NotMapped]
        public int Id => MovieId;
    }
}


