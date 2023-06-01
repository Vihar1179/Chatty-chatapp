package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Contact {
   @Id
   @GeneratedValue(strategy=GenerationType.IDENTITY)
   private Long contactid;
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "userid", nullable = false)
   private User userid;
   
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "msgid", nullable = false)
   private Message msgid;
   
   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "groupid", nullable = false)
   private GroupId groupid;
   
   private String contactName;
   
  
   
   
}
   
  