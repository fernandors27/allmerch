SELECT * FROM users;
DELETE FROM users;
SHOW TABLES ;

SELECT * FROM sessions;
DELETE FROM sessions;

INSERT INTO users(email, name, password, address, role)
    VALUE ('admin@gmail.com', 'Admin', '$2b$10$4nHLsV7/nHCPZ3gWxopLrODSzb2awgNdg9M9dQAsVgs0.48dkNY9m', '-','admin');
INSERT INTO merchandises(id, id_category, name, stock, price, image_url)
    VALUES  ('P0001', 1, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png'),
            ('P0002', 1, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png'),
            ('P0003', 1, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png'),
            ('P0004', 1, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png'),
            ('P0005', 2, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png'),
            ('P0006', 2, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png'),
            ('P0007', 2, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png'),
            ('P0008', 2, 'PalVerse Pale. Spice and Wolf Holo Figure JAPAN OFFICIAL', 10, 800000, '/image/Botan_0.png');

SELECT * FROM categories;
INSERT INTO categories(name)
    VALUES ('Bundle'),('TALENT HOLO (Ookami to Koushinryou)');

SELECT * FROM merchandises;
DELETE FROM merchandises;

SELECT * FROM merchandise_details;
SELECT * FROM chart_order;

TRUNCATE TABLE chart_order;
TRUNCATE TABLE merchandise_details;
DELETE FROM merchandises;
TRUNCATE table sessions;
delete from users;
