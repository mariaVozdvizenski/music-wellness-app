using System.Linq;
using DAL;
using Domain;

namespace Extensions
{
    public static class DataInitializers
    {
        public static void AddMoods(AppDbContext context)
        {
            var moods = new Mood[]
            {
                new Mood()
                {
                    Id = 1,
                    MoodName = "Happy"
                },
                new Mood()
                {
                    Id = 2,
                    MoodName = "Nostalgic"
                },
                new Mood()
                {
                    Id = 3,
                    MoodName = "Calm"
                },
                new Mood()
                {
                    Id = 4,
                    MoodName = "Focused"
                },
                new Mood()
                {
                    Id = 5,
                    MoodName = "Powerful"
                },
                new Mood()
                {
                    Id = 6,
                    MoodName = "Energetic"
                },
            };
            
            AddDataToDb(moods, context);
        }
        
        private static async void AddDataToDb (Mood[] moods, AppDbContext context)
        {
            foreach (var mood in moods)
            {
                if (!context.Moods.Any(l => l.Id == mood.Id))
                {
                    await context.Moods.AddAsync(mood);
                }
            }
            await context.SaveChangesAsync();
        }
    }
}