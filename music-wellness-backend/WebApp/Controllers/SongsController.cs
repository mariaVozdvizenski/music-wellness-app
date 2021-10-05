using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using Authentication;
using Microsoft.AspNetCore.Mvc;
using DAL.Repositories;
using Domain;
using DTO;
using Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongsController : ControllerBase
    {
        private readonly SongRepository _repository;
        private readonly SongMapper _mapper = new ();

        public SongsController(SongRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Songs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongDTO>>> GetSongs(int? moodId)
        {
            if (moodId == null)
            {
                var allSongs = await _repository.GetAll();
                return allSongs.Select(s => _mapper.EntityToDto(s)).ToList();
            }
            var songs = await _repository.GetSongsByMoodId(moodId);
            if (songs == null)
            {
                return BadRequest(new {message = "This mood doesn't exist."});
            }
            return songs.Select(s => _mapper.EntityToDto(s)).ToList();
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
        [HttpPut("{id}"), Authorize(Roles = UserRoles.Admin)]
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
        [HttpPost, Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<Song>> PostSong(Song song)
        {
            await _repository.Add(song);
            return CreatedAtAction("GetSong", new { id = song.Id }, song);
        }
        
        [HttpPost("upload"), Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult> UploadAudio(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest();
            }
            var songTitle = $@"{DateTime.Now.Ticks}";
            var validExtensions = new List<string>{".mp3"};
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
            HttpResponseMessage result = null;  

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
            //return File(b, "audio/mpeg");
            //var b = System.IO.File.Create(filePath);
            return File(b, "audio/mpeg", true);

        }

        // DELETE: api/Songs/5
        [HttpDelete("{id}"), Authorize(Roles = UserRoles.Admin)]
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
