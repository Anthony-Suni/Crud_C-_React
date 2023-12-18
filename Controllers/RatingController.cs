using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace csharp_crud_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly RatingContext _context;

        public RatingController(RatingContext context)
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

        // GET: api/ratings/5
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

        // PUT api/ratings/5
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

        // DELETE api/ratings/5
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

        // GET: api/ratings/user/5
        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<Rating>> GetRatingsByUser(int userId)
        {
            var ratings = _context.Ratings.Where(r => r.UserId == userId).ToList();

            if (!ratings.Any())
            {
                return NotFound();
            }

            return Ok(ratings);
        }

        // GET: api/ratings/movie/5
        [HttpGet("movie/{movieId}")]
        public ActionResult<IEnumerable<Rating>> GetRatingsByMovie(int movieId)
        {
            var ratings = _context.Ratings.Where(r => r.MovieId == movieId).ToList();

            if (!ratings.Any())
            {
                return NotFound();
            }

            return Ok(ratings);
        }
    }
}

