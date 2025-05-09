package idv.mythlit.cacodemon.service;

import idv.mythlit.cacodemon.controller.task.TaskInfoResponse;
import idv.mythlit.cacodemon.model.Task;
import idv.mythlit.cacodemon.repository.TaskRepository;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
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

    public boolean completeTask(String userId, String taskId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            return false;
        }

        Task task = taskOptional.get();
        if (!task.getUserId().equals(userId)) {
            return false;
        }

        task.setCompletedAt(new Date());
        try {
            taskRepository.save(task);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean reopenTask(String userId, String taskId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            return false;
        }

        Task task = taskOptional.get();
        if (!task.getUserId().equals(userId)) {
            return false;
        }

        task.setCompletedAt(null);
        try {
            taskRepository.save(task);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean updateTaskSpent(String userId, String taskId, Integer pomodoroSpent) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (taskOptional.isEmpty()) {
            return false;
        }

        Task task = taskOptional.get();
        if (!task.getUserId().equals(userId)) {
            return false;
        }

        task.setPomodoroSpent(pomodoroSpent);
        try {
            taskRepository.save(task);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Task> getTasksUnfinished(String userId) {
        return taskRepository.findByUserIdAndCompletedAtIsNull(userId);
    }

    public List<Task> getTasksFinished(String userId) {
        return taskRepository.findByUserIdAndCompletedAtIsNotNull(userId);
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

    public boolean checkUserTaskNotExists(String id, String userId) {
        Task task = new Task();
        task.setId(id);
        task.setUserId(userId);
        Example<Task> example = Example.of(task);
        return !taskRepository.exists(example);
    }

    public TaskInfoResponse getTaskInfo(String userId) {
        LocalDate now = LocalDate.now();
        LocalDateTime startOfToday = now.atStartOfDay();
        LocalDateTime sevenDaysAgo = now.minusDays(7).atStartOfDay();

        TaskInfoResponse info = new TaskInfoResponse();
        List<Task> todayCompleted = taskRepository.findByUserIdAndCompletedAtIsNotNullAndCompletedAtAfter(
                userId,
                Date.from(startOfToday.atZone(ZoneId.systemDefault()).toInstant())
        );
        int pomodoroSpentToday = 0;
        int taskCompletedToday = 0;
        for (Task task : todayCompleted) {
            pomodoroSpentToday += task.getPomodoroSpent();
            taskCompletedToday += 1;
        }
        info.setPomodoroSpentToday(pomodoroSpentToday);
        info.setTaskCompletedToday(taskCompletedToday);

        List<Task> completed7days = taskRepository.findByUserIdAndCompletedAtIsNotNullAndCompletedAtAfter(
                userId,
                Date.from(sevenDaysAgo.atZone(ZoneId.systemDefault()).toInstant())
        );
        int pomodoroSpent7days = 0;
        int taskCompleted7days = 0;
        for (Task task : completed7days) {
            pomodoroSpent7days += task.getPomodoroSpent();
            taskCompleted7days += 1;
        }
        info.setPomodoroSpent7days(pomodoroSpent7days);
        info.setTaskCompleted7days(taskCompleted7days);

        List<Task> allCompleted = taskRepository.findByUserIdAndCompletedAtIsNotNull(userId);
        int pomodoroSpentTotal = 0;
        int taskCompletedTotal = 0;
        for (Task task : allCompleted) {
            pomodoroSpentTotal += task.getPomodoroSpent();
            taskCompletedTotal += 1;
        }
        info.setPomodoroSpentTotal(pomodoroSpentTotal);
        info.setTaskCompletedTotal(taskCompletedTotal);

        return info;
    }
}
