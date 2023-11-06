import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Post content to the database");

  // Generate a unique ID for the content using the 'uuid' library
  const { v4: uuidv4 } = require('uuid');
  const id = uuidv4();

  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");

  // Store the content along with the generated ID
  const request = store.put({ id, content });
  const result = await request;

  console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
  console.log("Get content from the database by ID");

  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");

  // Use the `.get` method with the provided ID to retrieve the specific content item
  const request = store.get(id);
  const result = await request;

  if (result) {
    console.log('Result:', result);
    return result;
  } else {
    console.log(`Content with ID ${id} not found.`);
    return null; // or throw an error or handle the not-found case as needed
  }
};
initdb();
