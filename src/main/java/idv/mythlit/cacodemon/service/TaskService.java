package idv.mythlit.cacodemon.service;

import idv.mythlit.cacodemon.model.Task;
import idv.mythlit.cacodemon.repository.TaskRepository;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Optional<Task> createTask(String userId, String taskName, Integer pomodoroGoal) {
        Task task = new Task();
        task.setUserId(userId);
        task.setTaskName(taskName);
        task.setPomodoroGoal(pomodoroGoal);
        task.setPomodoroSpent(0);
        UUID uuid = UUID.randomUUID();
        task.setId(uuid.toString());
        try {
            taskRepository.save(task);
            return Optional.of(task);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public List<Task> getTasksUnfinished(String userId) {
        return taskRepository.findByUserIdAndCompletedAtIsNull(userId);
    }

    public boolean deleteTask(String id) {
        taskRepository.deleteById(id);
        try {
            taskRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean checkUserTaskExists(String id, String userId) {
        Task task = new Task();
        task.setId(id);
        task.setUserId(userId);
        Example<Task> example = Example.of(task);
        return taskRepository.exists(example);
    }
}
