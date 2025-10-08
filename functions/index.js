/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
// const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

setGlobalOptions({region: "australia-southeast1"});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.listBooks = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await admin.firestore().collection("books").get();
      const books = snap.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      res.status(200).json({count: books.length, books});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: error.message});
    }
  });
});

exports.uppercaseBookOnCreate = onDocumentCreated(
    "books/{bookId}",
    async (event) => {
      const snap = event.data;
      if (!snap) return;
      const data = snap.data();
      if (data && data._normalized === true) return;
      const uppercased = {};
      for (const [key, val] of Object.entries(data || {})) {
        uppercased[key] = (typeof val === "string") ? val.toUpperCase() : val;
      }
      uppercased._normalized = true;
      await snap.ref.update(uppercased);
    },
);

