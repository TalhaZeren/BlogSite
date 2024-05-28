package com.blogYazilimApp.myBlogSiteApp.Controllers;


import com.blogYazilimApp.myBlogSiteApp.Entities.Post;
import com.blogYazilimApp.myBlogSiteApp.Requests.PostCreateRequest;
import com.blogYazilimApp.myBlogSiteApp.Requests.PostUpdateRequest;
import com.blogYazilimApp.myBlogSiteApp.Services.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("posts")
public class PostController {


    PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts(@RequestParam Optional<Long> userId){
        return postService.getAllPosts(userId);
    }

    @GetMapping("/{postId}")
    public Post getOnePost(@PathVariable Long postId){
        return postService.getOnePostById(postId);
    }

    @PostMapping("/create")
    public Post createOnePost(@RequestBody PostCreateRequest newPostRequest){
            return postService.createOnePost(newPostRequest);
    }

    @PutMapping("/{postId}")
    public Post updatePost(@PathVariable Long postId, @RequestBody PostUpdateRequest postUpdateRequest){
        return postService.updatePost(postId,postUpdateRequest);
    }

    @DeleteMapping("/{postId}")
    public String deletePost(@PathVariable Long postId){
        return postService.deletePost(postId);
    }



}
