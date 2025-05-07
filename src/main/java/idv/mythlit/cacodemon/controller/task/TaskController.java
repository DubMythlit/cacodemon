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
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id, Authentication auth) {
        String username = auth.getName();
        Optional<AppUser> userOptional = appUserService.getAppUserByName(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
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
}
