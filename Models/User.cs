using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("userId")]
        public int userId { get; set; }

        [Column("gender")]
        public string? Gender { get; set; }

        [Column("age")]
        public int? Age { get; set; }

        [Column("occupation")]
        public string? Occupation { get; set; }

        [Column("zip-code")]
        public string? ZipCode { get; set; }
    }
}
