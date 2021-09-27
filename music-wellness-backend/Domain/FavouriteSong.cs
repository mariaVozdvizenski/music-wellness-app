
using Authentication;

namespace Domain
{
    public class FavouriteSong : IEntity
    {
        public int Id { get; set; }
        
        public int SongId { get; set; }
        public Song Song { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } 
    }
}