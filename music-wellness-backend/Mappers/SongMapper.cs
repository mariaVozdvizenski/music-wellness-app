using System;
using System.Linq;
using Domain;
using DTO;

namespace Mappers
{
    public class SongMapper : IMapper<Song, SongDTO>
    {
        public SongDTO EntityToDto(Song entity)
        {
            return new()
            {
                Id = entity.Id,
                Artist = entity.Artist,
                FileName = entity.FileName,
                MoodName = entity.Mood.MoodName,
                Title = entity.Title,
                MoodId = entity.MoodId,
                RatingCount = entity.SongRatings?.Count,
                AverageRating = entity.SongRatings?.Average(sr => sr?.Rating)
            };
        }

        public Song DtoToEntity(SongDTO entityDto)
        {
            return new()
            {
                Id = entityDto.Id,
                Artist = entityDto.Artist,
                FileName = entityDto.FileName,
                Title = entityDto.Title,
                MoodId = entityDto.MoodId
            };
        }
    }
}