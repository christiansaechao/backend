import crypto from "crypto";

/**
 * Using the crypto library that's native to node
 * 1. Create a random token that'll be sent to the frontend and stored in the user's browser as cookies
 * 2. Hash the token to be stored on a refresh token table (it's linked to the user)
 * 3. Validation - compare the hashed token on the database to the one stored on the client
 */

/**
 * Creates a Random token using the built in crypto library.
 * Sends back the raw token for the client, and hashes it to be stored on the database.
 * Follows the same pattern as bcrypt for storing and hashing passwords.
 * @returns { refreshToken: string, hashedToken: string }
 */
export const generateRefreshToken = () => {
  const refreshToken = crypto.randomBytes(64).toString("hex"); // create a random 128-character token
  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex"); // hashed version

  return { refreshToken, hashedToken };
};

/**
 * This function hashes the passed Refresh token from the client
 * and compares it to the Refresh token on the database.
 * @param {String} token
 * @param {String} dbToken
 * @returns Boolean
 */
export const validateRefreshToken = (token, dbToken) => {
  if (!token || !dbToken) return false;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    // Convert both to buffers with identical encoding
    const hashedBuffer = Buffer.from(hashedToken, "hex");
    const dbBuffer = Buffer.from(dbToken, "hex");

    // Return true if they match in a timing-safe way
    return crypto.timingSafeEqual(hashedBuffer, dbBuffer);
  } catch {
    // timingSafeEqual throws if buffer lengths differ
    return false;
  }
};
