package idv.mythlit.cacodemon.service;

import idv.mythlit.cacodemon.model.Task;
import idv.mythlit.cacodemon.repository.TaskRepository;
import org.springframework.stereotype.Service;

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
}
