using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Song
    {
        public int Id { get; set; }
        
        [Required, MaxLength(50)]
        public string Title { get; set; }
        
        [MaxLength(50)]
        public string Artist { get; set; }
        
        public string FileName { get; set; }
        
        public int MoodId { get; set; }
        public Mood Mood { get; set; }

        public ICollection<FavouriteSong> FavouriteSongs { get; set; }
    }
}