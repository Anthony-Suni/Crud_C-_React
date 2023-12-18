using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("movies")]
    public class Movie
    {
        [Key]
        [Column("movieId")]
        public int Id { get; set; }

        [Column("title")]
        public string Pelicula { get; set; }

        [Column("genres")]
        public string Genero { get; set; }
        
    }
}


