using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Data;

[ApiController]
[Route("api/[controller]")]
public class RatingsController : ControllerBase
{
    private readonly RatingContext _context;

    public RatingsController(RatingContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Rating>>> GetRatings()
    {
        return await _context.Ratings.ToListAsync();
    }

    [HttpGet("{userId}/{movieId}")]
    public async Task<ActionResult<Rating>> GetRating(int userId, int movieId)
    {
        var rating = await _context.Ratings.FindAsync(userId, movieId);

        if (rating == null)
        {
            return NotFound();
        }

        return rating;
    }

    [HttpPost]
    public async Task<ActionResult<Rating>> PostRating(Rating rating)
    {
        _context.Ratings.Add(rating);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRating), new { userId = rating.UserId, movieId = rating.MovieId }, rating);
    }

    [HttpPut("{userId}/{movieId}")]
    public async Task<IActionResult> PutRating(int userId, int movieId, Rating rating)
    {
        if (userId != rating.UserId || movieId != rating.MovieId)
        {
            return BadRequest();
        }

        _context.Entry(rating).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RatingExists(userId, movieId))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{userId}/{movieId}")]
    public async Task<IActionResult> DeleteRating(int userId, int movieId)
    {
        var rating = await _context.Ratings.FindAsync(userId, movieId);
        if (rating == null)
        {
            return NotFound();
        }

        _context.Ratings.Remove(rating);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool RatingExists(int userId, int movieId)
    {
        return _context.Ratings.Any(e => e.UserId == userId && e.MovieId == movieId);
    }
}

