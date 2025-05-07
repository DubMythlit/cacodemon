package idv.mythlit.cacodemon.controller.task;

import idv.mythlit.cacodemon.model.AppUser;
import idv.mythlit.cacodemon.model.Task;
import idv.mythlit.cacodemon.service.AppUserService;
import idv.mythlit.cacodemon.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/task")
public class TaskController {
    private final TaskService taskService;
    private final AppUserService appUserService;

    public TaskController(TaskService taskService, AppUserService appUserService) {
        this.taskService = taskService;
        this.appUserService = appUserService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreateTaskBody body, Authentication auth) {
        if (body.getTaskName() == null || body.getPomodoroGoal() == null) {
            return ResponseEntity.badRequest().body("錯誤的請求格式");
        }

        String username = auth.getName();
        Optional<AppUser> userOptional = appUserService.getAppUserByName(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        Optional<Task> result = taskService.createTask(
                userOptional.get().getId(),
                body.getTaskName(),
                body.getPomodoroGoal()
        );
        if (result.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        Task task = result.get();
        TaskResponse res = toTaskResponse(task);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTasks(Authentication auth) {
        String username = auth.getName();
        Optional<AppUser> userOptional = appUserService.getAppUserByName(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        String userId = userOptional.get().getId();
        try {
            List<TaskResponse> tasks = taskService.getTasksUnfinished(userId).stream()
                    .map(TaskController::toTaskResponse).toList();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchTask(@PathVariable String id, @RequestBody PatchTaskBody body, Authentication auth) {
        String username = auth.getName();
        Optional<AppUser> userOptional = appUserService.getAppUserByName(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        Date completedAt = body.getCompletedAt();
        Integer pomodoroSpent = body.getPomodoroSpent();
        if (completedAt != null && pomodoroSpent == null) {
            return ResponseEntity.badRequest().build();
        }

        String userId = userOptional.get().getId();
        if (!taskService.checkUserTaskExists(id, userId)) {
            return ResponseEntity.notFound().build();
        }

        boolean isPatchSuccess = false;
        if (completedAt != null) {
            isPatchSuccess = taskService.completeTask(userId, id, pomodoroSpent);
        } else {
            isPatchSuccess = taskService.reopenTask(userId, id);
        }

        if (isPatchSuccess) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id, Authentication auth) {
        String username = auth.getName();
        Optional<AppUser> userOptional = appUserService.getAppUserByName(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.internalServerError().build();
        }

        String userId = userOptional.get().getId();
        if (!taskService.checkUserTaskExists(id, userId)) {
            return ResponseEntity.notFound().build();
        }

        if (!taskService.deleteTask(id)) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private static TaskResponse toTaskResponse(Task task) {
        TaskResponse res = new TaskResponse();
        res.setId(task.getId());
        res.setTaskName(task.getTaskName());
        res.setPomodoroGoal(task.getPomodoroGoal());
        res.setPomodoroSpent(task.getPomodoroSpent());
        res.setCompletedAt(task.getCompletedAt());
        return res;
    }
}
