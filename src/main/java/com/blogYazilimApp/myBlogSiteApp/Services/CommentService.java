package com.blogYazilimApp.myBlogSiteApp.Services;


import com.blogYazilimApp.myBlogSiteApp.Entities.Comment;
import com.blogYazilimApp.myBlogSiteApp.Entities.Post;
import com.blogYazilimApp.myBlogSiteApp.Entities.User;
import com.blogYazilimApp.myBlogSiteApp.Repositories.CommentRepository;
import com.blogYazilimApp.myBlogSiteApp.Requests.CommentCreateRequest;
import com.blogYazilimApp.myBlogSiteApp.Requests.CommentUpdateRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    CommentRepository commentRepository;
    UserService userService;
    PostService postService;
    public CommentService(CommentRepository commentRepository,UserService userService,PostService postService){
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.postService = postService;
    }


    public List<Comment> getAllComments(Optional<Long> userId, Optional<Long> postId) {
        if(userId.isPresent() && postId.isPresent()){
            return commentRepository.findByUserIdAndPostId(Optional.of(userId.get()), Optional.of(postId.get()));
        }
        else if (userId.isPresent()){
        return commentRepository.findByUserId(Optional.of(userId.get()));
        }
        else if(postId.isPresent()){
            return commentRepository.findByPostId(Optional.of(postId.get()));
        }
        else {
            return null;
        }
    }

    public Optional<Comment> getOneComment(Long commentId) {
        return commentRepository.findById(commentId);
    }

    public Comment createComment(CommentCreateRequest commentCreateRequest) {
        User user = userService.findById(commentCreateRequest.getUserId());
        Post post = postService.getOnePostById(commentCreateRequest.getPostId());

            if(user != null && post != null){
                Comment newComment = new Comment();
                newComment.setId(commentCreateRequest.getId());
                newComment.setText(commentCreateRequest.getText());
                newComment.setUser(user);
                newComment.setPost(post);
                return commentRepository.save(newComment);
            }
            return null;
    }


    public Comment updateComment(Long commentId, CommentUpdateRequest commentUpdateRequest) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isPresent()){
            Comment commentUpdating = comment.get();
            commentUpdating.setText(commentUpdateRequest.getText());
            commentRepository.save(commentUpdating);
            return commentUpdating;
        }
        else{
            return null;
        }
    }

    public String deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
        return "Yorum silinmistir.";
    }
}
