using System.Linq;
using Authentication;
using DAL;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Extensions
{
    public static class DataInitializers
    {
        public static void SeedData(AppDbContext context, UserManager<User> userManager)
        {
            AddMoods(context);
            AddSongs(context);
            AddAdmin(userManager);
        }
        
        private static void AddMoods(AppDbContext context)
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

        private static void AddAdmin(UserManager<User> userManager)
        {
            User user = new User()
            {
                UserName = "admin"
            };
            
            if (userManager.FindByNameAsync(user.UserName).Result == null)
            {
                var result = userManager.CreateAsync(user, "1234").Result;
                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, UserRoles.Admin);
                }
            }
        }
        
        private static void AddSongs(AppDbContext context)
        {
            var songs = new Song[]
            {
                new Song()
                {
                    Id = 1,
                    Title = "Test1",
                    MoodId = 1,
                    FileName = "test1.mp3"
                },
                new Song()
                {
                    Id = 2,
                    Title = "Test2",
                    MoodId = 1,
                    FileName = "test2.mp3"
                },
                new Song()
                {
                    Id = 3,
                    Title = "Test3",
                    MoodId = 2,
                    FileName = "test3.mp3"
                },
            };
            
            AddDataToDb(songs, context);
        }
        
        private static async void AddDataToDb<TEntity> (TEntity[] entities, AppDbContext context)
        where TEntity : class, IEntity
        {
            DbSet<TEntity> entityDbSet = context.Set<TEntity>();
            
            foreach (var entity in entities)
            {
                if (!entityDbSet.Any(l => l.Id == entity.Id))
                {
                    await entityDbSet.AddAsync(entity);
                }
            }
            await context.SaveChangesAsync();
        }
    }
}