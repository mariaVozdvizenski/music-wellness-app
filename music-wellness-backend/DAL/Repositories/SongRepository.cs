using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class SongRepository : Repository<Song, AppDbContext>
    {
        private readonly AppDbContext _context;
        public SongRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        
        public new async Task<List<Song>> GetAll()
        {
            return await _context.Songs.Include(s => s.Mood)
                                        .Include(s => s.SongRatings).ToListAsync();
        }   
        
        public new async Task<Song> Get(int id)
        {
            return await _context.Songs.Where(s => s.Id == id)
                .Include(s => s.Mood)
                .Include(s => s.SongRatings)
                .FirstOrDefaultAsync();
        }   
        
        public async Task<List<Song>> GetSongsByMoodId(int? moodId)
        {
            var mood = await _context.Moods.FindAsync(moodId);
            if (mood == null)
            {
                return null;
            } 
            return await _context.Songs.Where(s => s.MoodId == moodId)
                .Include(s => s.Mood)
                .Include(s => s.SongRatings)
                .ToListAsync();
        }
    }
}