import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

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

export const putDb = async (content) => {
  console.log("Post content to the database");

  // Generate a unique ID for the content using the 'uuid' library
  const { v4: uuidv4 } = require("uuid");
  const id = uuidv4();

  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");

  // Store the content along with the generated ID
  const request = store.put({ id: 1, value: content });
  const result = await request;

  console.log("Data saved to the database", result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
  console.log("Get content from the database by ID");

  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");

  // Uses the `.get` method with the provided ID to retrieve the specific content item
  const request = store.get(1);
  const result = await request;

  if (result) {
    console.log("Data retrieved from the database", result.value);
  } else {
    console.log("Data not found in the database");
    return result?.value; // or throw an error or handle the not-found case as needed
  }
};
initdb();
