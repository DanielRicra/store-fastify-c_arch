import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();

const db = new sqlite.Database("./src/data/store.db", (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("Connected to the store.db SQLite database");
});

db.run(
  `CREATE TABLE IF NOT EXISTS products(\
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    imgUrl TEXT NOT NULL,\
    name TEXT NOT NULL,\
    price REAL NOT NULL,\
    rating INTEGER NOT NULL)`,
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Table products already exists or created successfully");
    }
  }
);

export { db };
