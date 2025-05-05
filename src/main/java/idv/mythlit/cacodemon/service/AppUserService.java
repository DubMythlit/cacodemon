package idv.mythlit.cacodemon.service;

import idv.mythlit.cacodemon.model.AppUser;
import idv.mythlit.cacodemon.repository.AppUserRepository;
import idv.mythlit.cacodemon.util.SHA256EncoderUtil;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public Optional<AppUser> getAppUserByName(String username) {
        AppUser appUser = new AppUser();
        appUser.setName(username);
        return appUserRepository.findOne(Example.of(appUser));
    }

    public boolean checkUsernameTaken(String username) {
        AppUser appUser = new AppUser();
        appUser.setName(username);
        Example<AppUser> example = Example.of(appUser);
        return appUserRepository.exists(example);
    }

    public boolean createAppUser(String name, String password) {
        Date now = new Date();
        AppUser appUser = new AppUser();
        UUID uuid = UUID.randomUUID();
        appUser.setId(uuid.toString());
        appUser.setName(name);
        String encodedPassword = SHA256EncoderUtil.SHA256Encode(password);
        appUser.setPassword(encodedPassword);
        appUser.setDisplayName(name);
        appUser.setCreationTime(now);
        appUser.setModificationTime(now);
        try {
            appUserRepository.save(appUser);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateAppUser(String username, String password) {
        AppUser appUser = new AppUser();
        appUser.setName(username);
        String encodedPassword = SHA256EncoderUtil.SHA256Encode(password);
        appUser.setPassword(encodedPassword);
        return appUserRepository.exists(Example.of(appUser));
    }
}


