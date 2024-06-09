package com.blogYazilimApp.myBlogSiteApp.Services;

import com.blogYazilimApp.myBlogSiteApp.Entities.Like;
import com.blogYazilimApp.myBlogSiteApp.Entities.Post;
import com.blogYazilimApp.myBlogSiteApp.Entities.User;
import com.blogYazilimApp.myBlogSiteApp.Repositories.LikeRepository;
import com.blogYazilimApp.myBlogSiteApp.Repositories.PostRepository;
import com.blogYazilimApp.myBlogSiteApp.Repositories.UserRepository;
import com.blogYazilimApp.myBlogSiteApp.Requests.LikeCreateRequest;
import com.blogYazilimApp.myBlogSiteApp.Responses.LikeResponse;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LikeService {

    LikeRepository likeRepository;
    UserService userService;
    PostService postService;

    public LikeService(LikeRepository likeRepository,UserService userService,PostService postService){
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }


    public List<LikeResponse> getAllLikes(Optional<Long> postId, Optional<Long> userId) {
        List<Like> list;
        if(postId.isPresent() && userId.isPresent()){
            list = likeRepository.findByPostIdAndUserId(Optional.of(postId.get()), Optional.of(userId.get()));
        } else if (postId.isPresent()) {
            list = likeRepository.findByPostId(Optional.of(postId.get()));
        } else if (userId.isPresent()) {
            list = likeRepository.findByUserId(Optional.of(userId.get()));
        }
        else {
            list = likeRepository.findAll();
        }
        return list.stream().map(like -> new LikeResponse(like)).collect(Collectors.toList());
    }

    public Optional<Like> getOneLike(Long likeId) {
        return likeRepository.findById(likeId);
    }


    public Like createLike(LikeCreateRequest likeCreateRequest) {
        User user = userService.findById(likeCreateRequest.getUserId());
        Post post = postService.getOnePostById(likeCreateRequest.getPostId());

        if(user != null && post != null){
            Like newLike = new Like();
            newLike.setId(likeCreateRequest.getId());
            newLike.setPost(post);
            newLike.setUser(user);
            likeRepository.save(newLike);
            return newLike;
        }
        else {
            return null;
        }
    }

    public String deleteLike(Long likeId) {
        likeRepository.deleteById(likeId);
        return "Begeni geri alindi.";
    }
}
