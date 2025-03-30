// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Cloud Function: Triggered when a new message is created in the "messages" collection.
exports.sendCommunityNotification = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snap, context) => {
    const messageData = snap.data();
    const communityId = messageData.communityId; // Ensure each message has a communityId field.

    // Retrieve community members from "community_members" collection.
    const membersSnapshot = await admin.firestore()
      .collection('community_members')
      .where('communityId', '==', communityId)
      .get();

    let tokens = [];
    // For each community member, get their FCM token from "user_tokens".
    for (const memberDoc of membersSnapshot.docs) {
      const userId = memberDoc.data().userId;
      const tokenDoc = await admin.firestore().collection('user_tokens').doc(userId).get();
      if (tokenDoc.exists && tokenDoc.data().fcmToken) {
        tokens.push(tokenDoc.data().fcmToken);
      }
    }

    // If tokens exist, send the push notification.
    if (tokens.length > 0) {
      const payload = {
        notification: {
          title: "New Message in Community",
          body: messageData.text || "You have a new message.",
          icon: "https://yourdomain.com/path/to/icon.png" // Replace with your icon URL.
        }
      };

      try {
        await admin.messaging().sendToDevice(tokens, payload);
        console.log("Notification sent successfully");
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    }
    return null;
  });



/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

//const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
