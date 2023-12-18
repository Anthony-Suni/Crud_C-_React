using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("userId")]
        public int Id { get; set; }

        [Column("gender")]
        public string? Gender { get; set; } // Cambiado a string?

        [Column("age")]
        public int? Age { get; set; } // Cambiado a int?

        [Column("occupation")]
        public string? Occupation { get; set; } // Cambiado a string?

        [Column("zip-code")]
        public string? ZipCode { get; set; } // Cambiado a string?
    }
}
