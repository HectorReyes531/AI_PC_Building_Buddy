-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-11-30 19:38:12.882

-- tables
-- Table: components
CREATE TABLE components (
    components_id int  NOT NULL,
    name varchar(50)  NOT NULL,
    type varchar(50)  NOT NULL,
    price money  NOT NULL,
    description varchar(260)  NOT NULL,
    CONSTRAINT components_pk PRIMARY KEY (components_id)
);

-- Table: generated_computer
CREATE TABLE generated_computer (
    build_id serial  NOT NULL,
    components_id_fk int  NOT NULL,
    CONSTRAINT generated_computer_pk PRIMARY KEY (build_id)
);

-- Table: product_rating
CREATE TABLE product_rating (
    Components_components_id int  NOT NULL,
    Ratings_rating_id int  NOT NULL,
    id int  NOT NULL,
    date timestamp  NOT NULL,
    CONSTRAINT product_rating_pk PRIMARY KEY (id)
);

-- Table: ratings
CREATE TABLE ratings (
    score int  NOT NULL,
    rating_id int  NOT NULL,
    Users_id int  NOT NULL,
    CONSTRAINT ratings_pk PRIMARY KEY (rating_id)
);

-- Table: users
CREATE TABLE users (
    id serial  NOT NULL,
    userName varchar(20)  NOT NULL,
    password varchar(20)  NOT NULL,
    email varchar(50)  NOT NULL,
    savedBuilds varchar(500)  NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: ProductRating_Components (table: product_rating)
ALTER TABLE product_rating ADD CONSTRAINT ProductRating_Components
    FOREIGN KEY (Components_components_id)
    REFERENCES components (components_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ProductRating_Ratings (table: product_rating)
ALTER TABLE product_rating ADD CONSTRAINT ProductRating_Ratings
    FOREIGN KEY (Ratings_rating_id)
    REFERENCES ratings (rating_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Ratings_Users (table: ratings)
ALTER TABLE ratings ADD CONSTRAINT Ratings_Users
    FOREIGN KEY (Users_id)
    REFERENCES users (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: generated_computer_components (table: generated_computer)
ALTER TABLE generated_computer ADD CONSTRAINT generated_computer_components
    FOREIGN KEY (components_id_fk)
    REFERENCES components (components_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

