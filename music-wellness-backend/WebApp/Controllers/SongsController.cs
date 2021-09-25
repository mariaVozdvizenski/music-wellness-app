using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL;
using DAL.Repositories;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting.Internal;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly SongRepository _repository;

        public SongsController(SongRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongs()
        {
            return await _repository.GetAll();
        }

        // GET: api/Songs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetSong(int id)
        {
            var song = await _repository.Get(id);

            if (song == null)
            {
                return NotFound();
            }

            return song;
        }

        // PUT: api/Songs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSong(int id, Song song)
        {
            if (id != song.Id)
            {
                return BadRequest();
            }
            await _repository.Update(song);
            return NoContent();
        }

        // POST: api/Songs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Song>> PostSong(Song song)
        {
            await _repository.Add(song);
            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }
        
        [HttpPost("upload")]
        public async Task<ActionResult> UploadAudio(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest();
            }
            var songTitle = $@"{DateTime.Now.Ticks}";
            var validExtensions = new List<string>{".mp3", ".aac", ".wav", ".flac", ".alac", ".dsd"};
            var fileExtension =  Path.GetExtension(file.FileName);
            var filePath = Environment.CurrentDirectory + "\\Uploads\\" + songTitle + fileExtension;

            if (!validExtensions.Contains(fileExtension))
            {
                return BadRequest();
            }

            await using (var stream = System.IO.File.Create(filePath))
            {
                await file.CopyToAsync(stream);
            }
            
            return Ok(new {  message = "File uploaded successfully", fileName = songTitle + fileExtension });
        }
        
        [HttpGet("download")]
        public async Task<ActionResult> GetAudio(string fileName)
        {
            if (fileName == null)
            {
                return BadRequest();
            }
            var filePath = Environment.CurrentDirectory + "\\Uploads\\" + fileName;
            
            if (!System.IO.File.Exists(filePath))
            {
                return BadRequest();
            }
            
            Byte[] b = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(b, "audio/mpeg");
        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSong(int id)
        {
            var song = await _repository.Delete(id);
            if (song == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}