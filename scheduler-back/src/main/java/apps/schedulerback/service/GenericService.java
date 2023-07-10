package apps.schedulerback.service;

import org.springframework.data.jpa.repository.JpaRepository;

public class GenericService<ENTITY, PK, RESPOSITORY extends JpaRepository<ENTITY, PK>>{

    private final RESPOSITORY repository;

    public GenericService(RESPOSITORY repository) {
        this.repository = repository;
    }

    public ENTITY save(ENTITY entity) {
        return repository.save(entity);
    }

    public void delete(ENTITY entity) {
        repository.delete(entity);
    }

    public ENTITY findById(PK id) {
        return repository.findById(id).orElse(null);
    }

}