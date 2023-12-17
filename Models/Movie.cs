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

        // Agregado: Este atributo indica que la columna 'ratings' es un array en la base de datos
        [Column("ratings", TypeName = "integer[]")] 
        public int[] Ratings { get; set; }
    }
}

