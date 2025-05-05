package idv.mythlit.cacodemon.controller.appUser;

import idv.mythlit.cacodemon.model.AppUser;
import idv.mythlit.cacodemon.service.AppUserService;
import idv.mythlit.cacodemon.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/user")
public class AppUserController {
    private final AppUserService appUserService;
    private final JwtUtil jwtUtil;

    public AppUserController(AppUserService appUserService, JwtUtil jwtUtil) {
        this.appUserService = appUserService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreateAppUserBody body) {
        if (body.getUsername() == null || body.getPassword() == null) {
            return ResponseEntity.badRequest().body("使用者名稱/密碼不得為空");
        }

        boolean taken = appUserService.checkUsernameTaken(body.getUsername());
        if (taken) {
            return ResponseEntity.badRequest().body("使用者名稱已被使用");
        }

        boolean createSuccess = appUserService.createAppUser(body.getUsername(), body.getPassword());
        if (createSuccess) {
            String token = jwtUtil.generateToken(body.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> me(Authentication authentication) {
        Optional<AppUser> userOptional = appUserService.getAppUserByName(authentication.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Map<String, String> resBody = Map.of(
                "username", authentication.getName(),
                "displayName", userOptional.get().getDisplayName()
        );
        return ResponseEntity.ok(resBody);
    }
}
