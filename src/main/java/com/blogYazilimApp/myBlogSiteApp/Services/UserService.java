package com.blogYazilimApp.myBlogSiteApp.Services;

import com.blogYazilimApp.myBlogSiteApp.Entities.User;
import com.blogYazilimApp.myBlogSiteApp.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public User createUser(User newUser) {
        return userRepository.save(newUser);
    }

    public User updateUser(Long userId, User newUser) {
        Optional<User> user = userRepository.findById(userId); // Güncellenecek kullanıcı alındı.
        if(user.isPresent()){
            User foundUser = user.get();
            foundUser.setUsername(newUser.getUsername());
            foundUser.setPassword(newUser.getPassword());
            userRepository.save(foundUser);
            return foundUser;
        }
        else{
            return null;
        }
    }
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
        System.out.println("Kullanici Basariyla silinmistir.");
    }
}
