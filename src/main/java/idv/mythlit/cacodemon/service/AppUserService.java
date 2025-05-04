package idv.mythlit.cacodemon.service;

import idv.mythlit.cacodemon.model.AppUser;
import idv.mythlit.cacodemon.repository.AppUserRepository;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public boolean checkUsernameTaken(String username) {
        AppUser appUser = new AppUser();
        appUser.setName(username);
        Example<AppUser> example = Example.of(appUser);
        return appUserRepository.exists(example);
    }
}


