using System.ComponentModel.DataAnnotations;
using Authentication;

namespace Domain
{
    public class SongRating : IEntity
    {
        public int Id { get; set; }

        public int SongId { get; set; }

        public Song Song { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
        
        [Required, Range(1, 5)]
        public int Rating { get; set; }
    }
}