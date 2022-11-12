const db = require("../db/index");

exports.deleteTreasureById = (id) => {
  return db
    .query(`DELETE FROM treasures WHERE treasure_id = $1 RETURNING *`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No resource to delete",
        });
      }
      return result.rows[0];
    });
};
