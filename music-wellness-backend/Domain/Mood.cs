using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Mood : IEntity
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string MoodName { get; set; }

        public ICollection<Song> MoodSongs { get; set; }
    }
}