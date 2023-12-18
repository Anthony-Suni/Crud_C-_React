using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("ratings")]
    public class Rating
    {
        [Key]
        [Column("userId")]
        public int UserId { get; set; }

        [Key]
        [Column("movieId")]
        public int MovieId { get; set; }

        [Column("rating")]
        public int RatingValue { get; set; }

        [Column("timestamp")]
        public DateTime? Timestamp { get; set; }

        [NotMapped]
        public int Id => MovieId;
    }
}
