using Domain;

namespace DAL.Repositories
{
    public class MoodRepository : Repository<Mood, AppDbContext>
    {
        public MoodRepository(AppDbContext context) : base(context)
        {
        }
    }
}