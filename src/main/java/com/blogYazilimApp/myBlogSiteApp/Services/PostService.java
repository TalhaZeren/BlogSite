package com.blogYazilimApp.myBlogSiteApp.Services;

import com.blogYazilimApp.myBlogSiteApp.Entities.Post;
import com.blogYazilimApp.myBlogSiteApp.Entities.User;
import com.blogYazilimApp.myBlogSiteApp.Repositories.PostRepository;
import com.blogYazilimApp.myBlogSiteApp.Requests.PostCreateRequest;
import com.blogYazilimApp.myBlogSiteApp.Requests.PostUpdateRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    PostRepository postRepository;
    UserService userService;


    public PostService(PostRepository postRepository,UserService userService){
        this.postRepository = postRepository;
        this.userService = userService;
    }

    public List<Post> getAllPosts(Optional<Long> userId) { // Eğer userId mevcutsa ilgili user a ait postlar gelecek.
        if (userId.isPresent()){
            return postRepository.findByUserId(Optional.of(userId.get()));
        }
        else {
            return postRepository.findAll();
        }
    }

    public Post getOnePostById(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public Post createOnePost(PostCreateRequest newPostRequest) {
        User user = userService.findById(newPostRequest.getUserId());
            if (user == null){
                return null;
            }
            else{
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
            if (post.isPresent()){
            Post newPost = post.get();
            newPost.setTitle(postUpdateRequest.getTitle());
            newPost.setText(postUpdateRequest.getText());
            postRepository.save(newPost);
            return newPost;
            }
            else {
                return null;
            }
    }

    public String deletePost(Long postId) {
         postRepository.deleteById(postId);
         return "Başarıyla silinmiştir.";
    }
}
