import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Ensure we use the correct database ID from the config
const databaseId = (firebaseConfig as any).firestoreDatabaseId || "(default)";
export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);

async function testConnection() {
  try {
    // Testing connection to verify client is online and config is valid
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection established successfully.");
  } catch (error: any) {
    if (error?.code === 'permission-denied') {
      // If we get permission denied, it means we ARE connected but rules blocked us.
      // This is actually a sign the connection is fine, but for 'test/connection' 
      // we've now added a rule to allow it.
      console.log("Firebase connected (Permission verified).");
      return;
    }
    
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase is offline. Please check your connectivity.");
    } else {
      console.warn("Firebase connection test result:", error);
    }
  }
}

testConnection();
