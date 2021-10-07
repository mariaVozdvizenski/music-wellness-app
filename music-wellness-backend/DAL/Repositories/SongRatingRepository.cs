using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class SongRatingRepository : Repository<SongRating, AppDbContext>
    {
        private readonly AppDbContext _context;

        public SongRatingRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<SongRating> GetUserSongRatingForSong(int userId, int songId)
        {
            return await _context.SongRatings.Where(sr => sr.UserId == userId && sr.SongId == songId).FirstOrDefaultAsync();
        }
    }
}