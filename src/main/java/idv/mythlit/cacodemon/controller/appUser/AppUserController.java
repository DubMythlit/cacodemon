package idv.mythlit.cacodemon.controller.appUser;

import idv.mythlit.cacodemon.service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/user")
public class AppUserController {
    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody CreateAppUserBody body) {
        if (body.getUsername() == null || body.getPassword() == null) {
            return ResponseEntity.badRequest().body("使用者名稱/密碼不得為空");
        }

        boolean taken = appUserService.checkUsernameTaken(body.getUsername());
        if (taken) {
            return ResponseEntity.badRequest().body("使用者名稱已被使用");
        }

        boolean createSuccess = appUserService.createAppUser(body.getUsername(), body.getPassword());
        if (createSuccess) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }
}
