package com.blogYazilimApp.myBlogSiteApp.Controllers;

import com.blogYazilimApp.myBlogSiteApp.Entities.Like;
import com.blogYazilimApp.myBlogSiteApp.Requests.LikeCreateRequest;
import com.blogYazilimApp.myBlogSiteApp.Responses.LikeResponse;
import com.blogYazilimApp.myBlogSiteApp.Services.LikeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/likes")
public class LikeController {

    LikeService likeService;

    public LikeController(LikeService likeService){
        this.likeService=likeService;
    }

    @GetMapping
    public List<LikeResponse> getAllLikes(@RequestParam Optional<Long> postId, @RequestParam Optional<Long> userId){
        return likeService.getAllLikes(postId,userId);
    }

    @GetMapping("/{likeId}")
    public Optional<Like> getOneLike(@PathVariable Long likeId){
        return likeService.getOneLike(likeId);
    }

    @PostMapping("/create")
    public Like createLike(@RequestBody LikeCreateRequest likeCreateRequest){
        return likeService.createLike(likeCreateRequest);
    }


    @DeleteMapping("/{likeId}")
    public void deleteLike(@PathVariable Long likeId){
         likeService.deleteLike(likeId);
    }
}
