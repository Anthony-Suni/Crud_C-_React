using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("ratings")]
public class Rating
{
    [Key]
    [Column("userid")]
    public int UserId { get; set; }

    [Key]
    [Column("movieid")]
    public int MovieId { get; set; }

    [Column("rating")]
    public int RatingValue { get; set; }

    [Column("timestamp")]
    public DateTime? Timestamp { get; set; }

    [NotMapped]
    public int Id => MovieId;
}
}
