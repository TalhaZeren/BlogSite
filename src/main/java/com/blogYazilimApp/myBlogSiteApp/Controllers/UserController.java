package com.blogYazilimApp.myBlogSiteApp.Controllers;

import com.blogYazilimApp.myBlogSiteApp.Entities.User;
import com.blogYazilimApp.myBlogSiteApp.Services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping("/{userId}")
    public User getOneUser(@PathVariable Long userId){
        return userService.findById(userId);
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User newUser){
        return userService.createUser(newUser);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId,@RequestBody User newUser){
        return userService.updateUser(userId,newUser);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
    }
}
