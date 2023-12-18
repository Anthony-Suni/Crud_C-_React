using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("movies")]
    public class Movie
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("pelicula")]
        public string Pelicula { get; set; }

        [Column("genero")]
        public string Genero { get; set; }

       [Column("ratings", TypeName = "int[]")] 
        public int[]? Ratings { get; set; }

    }
}

