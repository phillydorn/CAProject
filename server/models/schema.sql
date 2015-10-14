CREATE DATABASE bracketDraft;

USE bracketDraft;

CREATE TABLE restaurants (
  google_id varchar NOT NULL,
  name varchar NOT NULL,
  website varchar(255) NOT NULL DEFAULT 'undefined',
  longitude double precision NOT NULL,
  latitude double precision NOT NULL,
  PRIMARY KEY(google_id)
);

CREATE TABLE reports (
  id int NOT NULL auto_increment,
  google_id varchar NOT NULL,
  wait_time int NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(google_id) REFERENCES restaurants(google_id)
);
