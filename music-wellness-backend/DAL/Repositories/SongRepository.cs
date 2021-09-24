using Domain;

namespace DAL.Repositories
{
    public class SongRepository : Repository<Song, AppDbContext>
    {
        public SongRepository(AppDbContext context) : base(context)
        {
        }
    }
}