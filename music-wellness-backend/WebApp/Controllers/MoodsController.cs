using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Repositories;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoodsController : ControllerBase
    {
        private readonly MoodRepository _repository; 

        public MoodsController(MoodRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Moods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mood>>> GetMoods()
        {
            return await _repository.GetAll();
        }

        // GET: api/Moods/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mood>> GetMood(int id)
        {
            var mood = await _repository.Get(id);
            if (mood == null)
            {
                return NotFound();
            }
            return mood;
        }

        // PUT: api/Moods/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> PutMood(int id, Mood mood)
        {
            if (id != mood.Id)
            {
                return BadRequest();
            }
            await _repository.Update(mood);
            return NoContent();
        }

        // POST: api/Moods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<Mood>> PostMood(Mood mood)
        {
            await _repository.Add(mood);
            return CreatedAtAction("GetMood", new { id = mood.Id }, mood);
        }

        // DELETE: api/Moods/5
        [HttpDelete("{id}"), Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteMood(int id)
        {
            var mood = await _repository.Delete(id);
            if (mood == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
