package idv.mythlit.cacodemon.controller.task;

import lombok.Data;

import java.util.Date;

@Data
public class TaskResponse {
    private String id;
    private String taskName;
    private Integer pomodoroGoal;
    private Integer pomodoroSpent;
    private Date completedAt;
}
