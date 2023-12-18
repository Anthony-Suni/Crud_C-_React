using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace csharp_crud_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly RatingContext _context;

        public RatingsController(RatingContext context)
        {
            _context = context;
        }

        // GET: api/ratings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatings()
        {
            var ratings = await _context.Ratings.ToListAsync();
            return Ok(ratings);
        }

        // GET: api/ratings/5/1
        [HttpGet("{userId}/{movieId}")]
        public async Task<ActionResult<Rating>> GetRating(int userId, int movieId)
        {
            var rating = await _context.Ratings.FindAsync(userId, movieId);

            if (rating == null)
            {
                return NotFound();
            }

            return Ok(rating);
        }

        // POST api/ratings
        [HttpPost]
        public async Task<ActionResult<Rating>> PostRating(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRating), new { userId = rating.UserId, movieId = rating.MovieId }, rating);
        }

        // PUT api/ratings/5/1
        [HttpPut("{userId}/{movieId}")]
        public async Task<IActionResult> PutRating(int userId, int movieId, Rating rating)
        {
            if (userId != rating.UserId || movieId != rating.MovieId)
            {
                return BadRequest();
            }

            _context.Entry(rating).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/ratings/5/1
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
    }
}
