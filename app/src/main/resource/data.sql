INSERT INTO category (name) VALUES ('category1');
INSERT INTO category (name) VALUES ('category2');
INSERT INTO category (name) VALUES ('category3');

INSERT INTO language (name) VALUES ('English');
INSERT INTO language (name) VALUES ('German');
INSERT INTO language (name) VALUES ('Italian');
INSERT INTO language (name) VALUES ('Arabic');
INSERT INTO language (name) VALUES ('Serbian');

INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('pera', 'peric', 'pera', 'pera', 'admin', 'https://www.jsweb.uk/images/loginascustomer_profile.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('zika', 'milenkovic', 'zika', 'zika', 'subscriber', 'http://www.medors.in/images/team/user.png', 2);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('ivan', 'ivanovic', 'ivan', 'ivan', 'admin', 'http://images.clipartpanda.com/visitor-clipart-61819-orange-man-tourist.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('sadasd', 'sadasd', 'fdf', 'fdgfd', 'subscriber', 'http://images.clipartpanda.com/visitor-clipart-61819-orange-man-tourist.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('sad', 'ivanovic', 'sadasd', 'sadsa', 'admin', 'http://images.clipartpanda.com/visitor-clipart-61819-orange-man-tourist.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('sadsa', 'ivanovic', 'sadasd', 'asdsa', 'admin', 'http://www.che.boun.edu.tr/images/People/personnel/user-f.png', 1);

INSERT INTO ebook (title, author, keywords, publication_year, filename, mime, category, language, ebookuser) VALUES ('Last man on Earth', 'J.J.Abraham', '', 1997, 'dasdas.pdf', 'application/pdf', 1, 1, 1);
INSERT INTO ebook (title, author, keywords, publication_year, filename, mime, category, language, ebookuser) VALUES ('Last man on Earth 2', 'J.J.Abraham', '', 1999, 'dasadasd.pdf', 'application/pdf', 3, 2, 3); 
