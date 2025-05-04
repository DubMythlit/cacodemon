package idv.mythlit.cacodemon.controller;

import idv.mythlit.cacodemon.model.AppUser;
import idv.mythlit.cacodemon.service.AppUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.UUID;

@RestController
public class HelloController {
    private final AppUserService appUserService;
    private int counter = 0;

    public HelloController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/")
    public String index() {
        return "Hello World";
    }

    @GetMapping("/create")
    public String create() {
        UUID uuid = UUID.randomUUID();
        AppUser appUser = new AppUser();
        appUser.setId(uuid.toString());
        String name = "阿胖" + counter + "號";
        appUser.setName(name);
        appUser.setPassword("123456");
        appUser.setDisplayName(name);
        Date now = new Date();
        appUser.setCreationTime(now);
        appUser.setModificationTime(now);
        appUserService.save(appUser);
        counter++;
        return name + " created";
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "你好，React 前端！";
    }

    @GetMapping("/secret")
    public String secretPage() {
        return "被你發現了";
    }
}
