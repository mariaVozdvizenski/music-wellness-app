using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Repositories;
using Domain;
using Extensions;
using Microsoft.AspNetCore.Authorization;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongRatingsController : ControllerBase
    {
        private readonly SongRatingRepository _songRatingRepository;

        public SongRatingsController(SongRatingRepository songRatingRepository)
        {
            _songRatingRepository = songRatingRepository;
        }

        // GET: api/SongRatings
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<SongRating>>> GetSongRatings()
        {
            return await _songRatingRepository.GetAll();
        }

        // GET: api/SongRatings/5
        [HttpGet("{id}"), Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<SongRating>> GetSongRating(int id)
        {
            var songRating = await _songRatingRepository.Get(id);
            if (songRating == null)
            {
                return NotFound();
            }
            return songRating;
        }
        
        [HttpGet("{userId}/{songId}"), Authorize]
        public async Task<ActionResult<SongRating>> GetSongRatingForLoggedInUser(int userId, int songId)
        {
            var loggedInUserId = User.GetLoggedInUserId<int>();
            if (loggedInUserId != userId)
            {
                return BadRequest(new {message = "Incorrect user."});
            }
            var userSongRating = await _songRatingRepository.GetUserSongRatingForSong(loggedInUserId, songId);
            if (userSongRating == null)
            {
                return NotFound();
            }
            return userSongRating;
        }

        // PUT: api/SongRatings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutSongRating(int id, SongRating songRating)
        {
            if (id != songRating.Id)
            {
                return BadRequest();
            }
            var loggedInUserId = User.GetLoggedInUserId<int>();
            if (loggedInUserId != songRating.UserId)
            {
                return BadRequest(new {message = "Incorrect user."});
            }
            await _songRatingRepository.Update(songRating);
            return NoContent();
        }

        // POST: api/SongRatings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize]
        public async Task<ActionResult<SongRating>> PostSongRating(SongRating songRating)
        {
            var loggedInUserId = User.GetLoggedInUserId<int>();
            if (loggedInUserId != songRating.UserId)
            {
                return BadRequest(new {message = "Incorrect user."});
            }
            
            var ratings = await _songRatingRepository.GetAll();
            if (ratings.Any(r => r.UserId == songRating.UserId && r.SongId == songRating.SongId))
            {
                return BadRequest(new {message = "User has already left a rating on current song."});
            }
            
            await _songRatingRepository.Add(songRating);
            return CreatedAtAction("GetSongRating", new { id = songRating.Id }, songRating);
        }

        // DELETE: api/SongRatings/5
        [HttpDelete("{id}"), Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteSongRating(int id)
        {
            var songRating = await _songRatingRepository.Delete(id);
            if (songRating == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
