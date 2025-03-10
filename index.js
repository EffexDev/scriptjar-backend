const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

const app = express();

// Use CORS middleware to allow requests from other origins
app.use(cors()); // Allows all origins by default

app.use(express.json()); // Middleware to parse JSON body

// Parse the Firebase service account JSON from an environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/**
 * Sets an admin claim for a user based on email.
 */
app.post("/set-admin", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    // Fetch user by email
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return res.json({ message: `✅ User ${email} is now an admin.` });
  } catch (error) {
    console.error("❌ Error setting admin role:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
