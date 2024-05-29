package com.blogYazilimApp.myBlogSiteApp.Controllers;


import com.blogYazilimApp.myBlogSiteApp.Entities.Comment;
import com.blogYazilimApp.myBlogSiteApp.Requests.CommentCreateRequest;
import com.blogYazilimApp.myBlogSiteApp.Requests.CommentUpdateRequest;
import com.blogYazilimApp.myBlogSiteApp.Services.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    CommentService commentService;

    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getAllComments(@RequestParam Optional<Long> userId,@RequestParam Optional<Long> postId){
        return commentService.getAllComments(userId,postId);
    }

    @GetMapping("/{commentId}")
    public Optional<Comment> getOneComment(@PathVariable Long commentId){
        return commentService.getOneComment(commentId);
    }

    @PostMapping("/create")
    public Comment createComment(@RequestBody CommentCreateRequest commentCreateRequest){
        return commentService.createComment(commentCreateRequest);
    }

    @PutMapping("/{commentId}")
    public Comment updateComment(@PathVariable Long commentId, @RequestBody CommentUpdateRequest commentUpdateRequest){
        return commentService.updateComment(commentId,commentUpdateRequest);
    }

    @DeleteMapping("/{commentId}")
    public String deleteComment(@PathVariable Long commentId){
        return commentService.deleteComment(commentId);
    }


}
