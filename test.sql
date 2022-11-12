\c mitchs_rare_treasures_test
-- \dt
-- \echo '\n This is the shops table\n'
-- SELECT * FROM shops;
-- \echo '\n This is the treasures table\n'
-- SELECT * FROM treasures;


SELECT treasures.treasure_id, 
treasures.treasure_name, 
treasures.colour, 
treasures.age, 
treasures.cost_at_auction,
shops.shop_name
FROM treasures JOIN shops ON treasures.shop_id = shops.shop_id;