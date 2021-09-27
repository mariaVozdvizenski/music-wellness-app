using System;

namespace DTO
{
    public class SongDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Artist { get; set; }
        public string FileName { get; set; }
        public string MoodName { get; set; }
        
        public int MoodId { get; set; }
    }
}