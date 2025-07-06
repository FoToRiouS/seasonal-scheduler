package apps.schedulerback.service;

import apps.schedulerback.model.domain.ValidationException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class GenericService<ENTITY, PK, RESPOSITORY extends JpaRepository<ENTITY, PK>>{

    protected final RESPOSITORY repository;

    @Autowired
    private Validator validator;

    public GenericService(RESPOSITORY repository) {
        this.repository = repository;
    }

    public ENTITY save(ENTITY entity) {
        validate(entity);
        return repository.save(entity);
    }

    public void delete(ENTITY entity) {
        repository.delete(entity);
    }

    public void deleteById(PK pk) {
        repository.deleteById(pk);
    }

    public ENTITY findById(PK id) {
        return repository.findById(id).orElse(null);
    }

    protected List<String> validate(ENTITY entity, Class<?>... groups) {
        return validate(entity, null, groups);
    }

    protected List<String> validate(ENTITY entity, String property, Class<?>... groups) {
        List<String> errors = new ArrayList<>();
        Set<ConstraintViolation<ENTITY>> constraints;
        if (property != null && !property.isBlank()) {
            constraints = validator.validateProperty(entity, property, groups);
        } else {
            constraints = validator.validate(entity, groups);
        }

        if (!constraints.isEmpty()) {
            for (ConstraintViolation<?> constraintViolation : constraints) {
                errors.add(constraintViolation.getMessage());
            }
            throw new ValidationException(errors);
        }

        return errors;
    }
}
