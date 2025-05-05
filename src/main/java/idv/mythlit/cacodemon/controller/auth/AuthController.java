package idv.mythlit.cacodemon.controller.auth;

import idv.mythlit.cacodemon.service.AppUserService;
import idv.mythlit.cacodemon.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AppUserService appUserService;
    private final JwtUtil jwtUtil;

    public AuthController(AppUserService appUserService, JwtUtil jwtUtil) {
        this.appUserService = appUserService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        boolean validated = appUserService.validateAppUser(username, password);
        if (validated) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(Map.of("token", token));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
