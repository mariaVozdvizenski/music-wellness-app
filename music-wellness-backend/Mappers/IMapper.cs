namespace Mappers
{
    public interface IMapper<TEntity, TEntityDTO>
    where TEntity : class
    where TEntityDTO : class
    {
        TEntityDTO EntityToDto(TEntity entity);
        TEntity DtoToEntity(TEntityDTO entityDto);
    }
}