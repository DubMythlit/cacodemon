package idv.mythlit.cacodemon.repository;

import idv.mythlit.cacodemon.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    List<Task> findByUserIdAndCompletedAtIsNull(String userId);
}
