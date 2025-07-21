const { Client } = require("pg");

module.exports.getUser = async (event) => {
//   const userId = event.pathParameters?.id;

//   if (!userId) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ error: "Missing user ID" }),
//     };
//   }






  try {
    await client.connect();

    const result = await client.query("SELECT * FROM visitor limit 1");

    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0]),
    };
  } catch (err) {
    console.error("Postgres error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  } finally {
    await client.end();
  }
};
