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
        public static void SeedData(AppDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            AddMoods(context);
            AddSongs(context);
            AddAdmin(userManager, roleManager);
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

        private static async void AddAdmin(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            User user = new User()
            {
                UserName = "admin"
            };
            
            if (userManager.FindByNameAsync(user.UserName).Result == null)
            {
                if (!await roleManager.RoleExistsAsync(UserRoles.Admin))  
                    await roleManager.CreateAsync(new Role{Name = UserRoles.Admin});  
                if (!await roleManager.RoleExistsAsync(UserRoles.User))  
                    await roleManager.CreateAsync(new Role{Name = UserRoles.User});  
                
                var result = userManager.CreateAsync(user, "1234").Result;
                
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, UserRoles.Admin);
                    await userManager.AddToRoleAsync(user, UserRoles.User);
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
                    Title = "Cali",
                    Artist = "Wataboi",
                    MoodId = 1,
                    FileName = "test1.mp3"
                },
                new Song()
                {
                    Id = 2,
                    Title = "Energetic Hip-Hop",
                    Artist = "Skilsel",
                    MoodId = 1,
                    FileName = "test2.mp3"
                },
                new Song()
                {
                    Id = 3,
                    Title = "In the Forest",
                    Artist = "Lesfm",
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