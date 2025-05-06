package idv.mythlit.cacodemon.model;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Task {
    @Id
    private String id;

    @Basic
    private String userId;

    @Basic
    private String taskName;

    @Basic
    private Integer pomodoroGoal;

    @Basic
    private Integer pomodoroSpent;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date completedAt;
}
