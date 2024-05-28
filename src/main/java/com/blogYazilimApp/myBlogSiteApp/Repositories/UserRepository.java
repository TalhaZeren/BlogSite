package com.blogYazilimApp.myBlogSiteApp.Repositories;

import com.blogYazilimApp.myBlogSiteApp.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
