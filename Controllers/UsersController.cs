using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace csharp_crud_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly RatingContext _context;

        public UsersController(RatingContext context)
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
        [HttpGet("{id}")]
        public async Task<ActionResult<Rating>> GetRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);

            if (rating == null)
            {
                return NotFound();
            }

            return rating;
        }

        // POST api/ratings
        [HttpPost]
        public async Task<ActionResult<Rating>> PostRating(Rating rating)
        {
            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRating), new { id = rating.Id }, rating);
        }

        // PUT api/ratings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRating(int id, Rating rating)
        {
            if (id != rating.Id)
            {
                return BadRequest();
            }

            _context.Entry(rating).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/ratings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var rating = await _context.Ratings.FindAsync(id);

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

        // GET: api/ratings/usermovie/5/1
        [HttpGet("usermovie/{userId}/{movieId}")]
        public ActionResult<Rating> GetRatingByUserAndMovie(int userId, int movieId)
        {
            var rating = _context.Ratings.FirstOrDefault(r => r.UserId == userId && r.MovieId == movieId);

            if (rating == null)
            {
                return NotFound();
            }

            return Ok(rating);
        }
    }
}

