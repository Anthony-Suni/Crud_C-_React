using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("users")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("genero")] // Agregado: Asegúrate de que coincida con el nombre de la columna en tu base de datos
        public string Genero { get; set; }

        [Column("pelicula")] // Agregado: Asegúrate de que coincida con el nombre de la columna en tu base de datos
        public string Pelicula { get; set; }

        [Column("rating")] // Agregado: Asegúrate de que coincida con el nombre de la columna en tu base de datos
        public int Rating { get; set; }
    }
}
