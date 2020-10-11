package com.api.model;

import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@ToString


@Document(collection = "article")
public class Article {
    @Id
    private String id;

    private String ArticleTitle;
    private String ArticleWriter_name;
    private String email;
    private String Description;

    public Article(String ArticleTitle,String ArticleWriter_name,String email,String Description,String id){
        this.ArticleTitle=ArticleTitle;
        this.ArticleWriter_name=ArticleWriter_name;
        this.email=email;
        this.Description=Description;
        this.id=id;
    }

    public void setId(String id) { this.id = id; }
    public void setArticleTitle(String articleTitle) { this.ArticleTitle = articleTitle; }
    public void setArticleWriter_name(String articleWriter_name) { this.ArticleWriter_name = articleWriter_name; }
    public void setEmail(String email) { this.email = email; }
    public void setDescription(String description) { this.Description = description; }

    public String getId() { return id; }
    public String getArticleTitle() { return ArticleTitle; }
    public String getArticleWriter_name() { return ArticleWriter_name; }
    public String getEmail() {return email; }
    public String getDescription() { return Description; }


}
