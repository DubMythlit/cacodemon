package idv.mythlit.cacodemon.controller.task;

import lombok.Data;

@Data
public class TaskInfoResponse {
    private Integer pomodoroSpentTotal;
    private Integer pomodoroSpent7days;
    private Integer pomodoroSpentToday;
    private Integer taskCompletedTotal;
    private Integer taskCompleted7days;
    private Integer taskCompletedToday;
}
