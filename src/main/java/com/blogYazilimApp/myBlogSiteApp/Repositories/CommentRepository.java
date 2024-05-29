package com.blogYazilimApp.myBlogSiteApp.Repositories;

import com.blogYazilimApp.myBlogSiteApp.Entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    List<Comment> findByUserIdAndPostId(Optional<Long> userId, Optional<Long> postId);

    List<Comment> findByUserId(Optional<Long> userId);

    List<Comment> findByPostId(Optional<Long> aLong);

}
