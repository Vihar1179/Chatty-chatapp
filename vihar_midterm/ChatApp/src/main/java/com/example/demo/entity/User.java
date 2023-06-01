package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class User {
   @Id
   @GeneratedValue(strategy=GenerationType.IDENTITY)
   private Long userid;
   private String userName;
   private String emailAddress;
   private String password;
   
   
  
   
}
   
  