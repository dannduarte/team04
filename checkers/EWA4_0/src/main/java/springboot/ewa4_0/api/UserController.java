package springboot.ewa4_0.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springboot.ewa4_0.model.User;
import springboot.ewa4_0.service.UserService;
import java.util.List;

@RequestMapping("api/test/user")
@RestController
public class UserController {

    private final UserService userService ;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @GetMapping
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

}
