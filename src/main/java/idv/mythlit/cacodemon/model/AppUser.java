package idv.mythlit.cacodemon.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class AppUser {
    @Id
    private String id;

    @Basic
    private String name;

    @Basic
    private String password;

    @Basic
    private String displayName;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationTime;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date modificationTime;
}
