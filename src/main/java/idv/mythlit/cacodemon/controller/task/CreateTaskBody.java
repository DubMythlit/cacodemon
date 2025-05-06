package idv.mythlit.cacodemon.controller.task;

import lombok.Data;

@Data
public class CreateTaskBody {
    private String taskName;
    private Integer pomodoroGoal;
}
