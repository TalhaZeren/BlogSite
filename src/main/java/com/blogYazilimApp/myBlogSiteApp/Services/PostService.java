package com.blogYazilimApp.myBlogSiteApp.Services;

import com.blogYazilimApp.myBlogSiteApp.Entities.Like;
import com.blogYazilimApp.myBlogSiteApp.Entities.Post;
import com.blogYazilimApp.myBlogSiteApp.Entities.User;
import com.blogYazilimApp.myBlogSiteApp.Repositories.PostRepository;
import com.blogYazilimApp.myBlogSiteApp.Requests.PostCreateRequest;
import com.blogYazilimApp.myBlogSiteApp.Requests.PostUpdateRequest;
import com.blogYazilimApp.myBlogSiteApp.Responses.LikeResponse;
import com.blogYazilimApp.myBlogSiteApp.Responses.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private PostRepository postRepository;
    private UserService userService;

    private LikeService likeService;


    public PostService(PostRepository postRepository, UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Autowired
    public void setLikeService(LikeService likeService) {
        this.likeService = likeService;
    }

    public List<PostResponse> getAllPosts(Optional<Long> userId) {
        List<Post> list;
        if (userId.isPresent()) {
            list = postRepository.findByUserId(Optional.of(userId.get()));
        } else {
            list = postRepository.findAll();
        }
        return list.stream().map(p -> {
            List<LikeResponse> likes = likeService.getAllLikes(Optional.ofNullable(null), Optional.of(p.getId()));
            return new PostResponse(p, likes);
        }).collect(Collectors.toList());
    }

    public Post getOnePostById(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public Post createOnePost(PostCreateRequest newPostRequest) {
        User user = userService.findById(newPostRequest.getUserId());
        if (user == null) {
            return null;
        } else {
            Post toSave = new Post();
            toSave.setId(newPostRequest.getId());
            toSave.setTitle(newPostRequest.getTitle());
            toSave.setText(newPostRequest.getText());
            toSave.setUser(user);
            return postRepository.save(toSave);
        }
    }

    public Post updatePost(Long postId, PostUpdateRequest postUpdateRequest) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            Post newPost = post.get();
            newPost.setTitle(postUpdateRequest.getTitle());
            newPost.setText(postUpdateRequest.getText());
            postRepository.save(newPost);
            return newPost;
        } else {
            return null;
        }
    }

    public String deletePost(Long postId) {
        postRepository.deleteById(postId);
        return "Başarıyla silinmiştir.";
    }
}
