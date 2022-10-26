package springboot.ewa4_0.dao;

import org.springframework.stereotype.Repository;
import springboot.ewa4_0.model.User;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository("Test_DAO")
public class UserDataAccessService implements UserDao {

    private static List<User> DB = new ArrayList<>();

    @Override
    public int insertUser(UUID id, User user) {
        DB.add(new User(id, user.getUsername()));
        return 1;
    }

    @Override
    public List<User> selectAllUser() {
        return DB;
    }
}
