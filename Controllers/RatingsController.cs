// ... (using statements)

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
    public async Task<ActionResult<IEnumerable<Rating>>> GetRatingsAsync()
    {
        return await _context.Ratings.ToListAsync();
    }

    [HttpGet("{userid}/{movieid}")]
    public async Task<ActionResult<Rating>> GetRatingAsync([FromRoute] int userId, [FromRoute] int movieId)
    {
        var rating = await _context.Ratings.FindAsync(userId, movieId);

        if (rating == null)
        {
            return NotFound();
        }

        return rating;
    }

    [HttpPost]
    public async Task<ActionResult<Rating>> PostRatingAsync([FromBody] Rating rating)
    {
        _context.Ratings.Add(rating);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRatingAsync), new { userId = rating.UserId, movieId = rating.MovieId }, rating);
    }

    [HttpPut("{userid}/{movieid}")]
    public async Task<IActionResult> PutRatingAsync([FromRoute] int userId, [FromRoute] int movieId, [FromBody] Rating rating)
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

    [HttpDelete("{userid}/{movieid}")]
    public async Task<IActionResult> DeleteRatingAsync([FromRoute] int userId, [FromRoute] int movieId)
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
