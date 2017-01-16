INSERT INTO category (name) VALUES ('Thriller');
INSERT INTO category (name) VALUES ('Fantasy');
INSERT INTO category (name) VALUES ('Fiction');
INSERT INTO category (name) VALUES ('Comedy');
INSERT INTO category (name) VALUES ('Romantic');
INSERT INTO category (name) VALUES ('Mistery');
INSERT INTO category (name) VALUES ('Novel');

INSERT INTO language (name) VALUES ('English');
INSERT INTO language (name) VALUES ('German');
INSERT INTO language (name) VALUES ('Norwegian');
INSERT INTO language (name) VALUES ('Italian');
INSERT INTO language (name) VALUES ('Arabic');
INSERT INTO language (name) VALUES ('Serbian');

INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('pera', 'peric', 'pera', 'pera', 'admin', 'https://www.jsweb.uk/images/loginascustomer_profile.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('zika', 'milenkovic', 'zika', 'zika', 'subscriber', 'http://www.medors.in/images/team/user.png', 2);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('ivan', 'ivanovic', 'ivan', 'ivan', 'admin', 'http://images.clipartpanda.com/visitor-clipart-61819-orange-man-tourist.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('sadasd', 'sadasd', 'fdf', 'fdgfd', 'subscriber', 'http://images.clipartpanda.com/visitor-clipart-61819-orange-man-tourist.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('sad', 'ivanovic', 'sadasd', 'sadsa', 'admin', 'http://images.clipartpanda.com/visitor-clipart-61819-orange-man-tourist.jpg', 1);
INSERT INTO ebookuser (firstname, lastname, username, user_password, type, profile_image, category) VALUES ('sadsa', 'ivanovic', 'sadasd', 'asdsa', 'admin', 'http://www.che.boun.edu.tr/images/People/personnel/user-f.png', 1);

INSERT INTO ebook (title, author, keywords, profile_image, publication_year, filename, mime, category, language, ebookuser) VALUES ('Green mile', 'Stephen King', '', 'http://ecx.images-amazon.com/images/I/51MHN3SW6XL.jpg',1996, 'dasdas.pdf', 'application/pdf', 2, 1, 1);
INSERT INTO ebook (title, author, keywords, profile_image, publication_year, filename, mime, category, language, ebookuser) VALUES ('Headhunters', 'Jo Nesbo', '', 'http://latimesblogs.latimes.com/.a/6a00d8341c630a53ef014e5f497e19970c-pi', 2011, 'dasadasd.pdf', 'application/pdf', 1, 3, 3);
INSERT INTO ebook (title, author, keywords, profile_image, publication_year, filename, mime, category, language, ebookuser) VALUES ('A Farewell to Arms', 'Ernest Hemingway', '', 'https://libcom.org/files/images/library/a_farewell_to_arms_0.jpg', 1929, 'dasadassds2d.pdf', 'application/pdf', 7, 1, 2);
