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
            return await _context.Ratings.ToListAsync();
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

            return ratings;
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

            return ratings;
        }

        // GET: api/ratings/usermovie/{userId}/{movieId}
        [HttpGet("usermovie/{userId}/{movieId}")]
        public ActionResult<Rating> GetRatingByUserAndMovie(int userId, int movieId)
        {
            var rating = _context.Ratings.FirstOrDefault(r => r.UserId == userId && r.MovieId == movieId);

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

            return CreatedAtAction(nameof(GetRatingByUserAndMovie), new { userId = rating.UserId, movieId = rating.MovieId }, rating);
        }

        // PUT api/ratings/usermovie/5/1
        [HttpPut("usermovie/{userId}/{movieId}")]
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

        // DELETE api/ratings/usermovie/5/1
        [HttpDelete("usermovie/{userId}/{movieId}")]
        public async Task<IActionResult> DeleteRating(int userId, int movieId)
        {
            var rating = await _context.Ratings.FirstOrDefaultAsync(r => r.UserId == userId && r.MovieId == movieId);

            if (rating == null)
            {
                return NotFound();
            }

            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();

            return NoCo
