import MOCK_DATA from "../ghost-mock-data.json";

const process = require("process");
import fs from "fs";
import { API_KEY, API_URL } from "./const";

export function renameFile(oldPath, newName) {
  const newPath = getFilePath(newName);
  fs.renameSync(oldPath, newPath);
}

export function getFilePath(fileName) {
  return process.cwd() + `screenshots/${fileName}/ -- e2e.png`;
}

/**
 * Generates a slug from a given title.
 *
 * @param {string} title - The title to generate the slug from.
 * @return {string} The generated slug.
 */
export function getSlug(title) {
  return title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[,.]+/g, "")
    .split("")
    .reduce((accumulator, current) => {
      if (
        accumulator &&
        accumulator[accumulator.length - 1] === "-" &&
        current === "-"
      ) {
        return accumulator;
      }
      return accumulator + current;
    }, "");
}

/**
 * Returns the data for a specific post in the POST_MOCK_DATA array.
 *
 * @param {number} position - The position of the post in the array.
 *                           Must be between 0 and 119.
 * @return {{title: string, description: string}} - The data for the post at the specified position.
 */
export function getAprioriPostData(position) {
  if (position < 0 || position > 119) {
    return new Error(
      "The post position in 'getAprioriPostData' must be between 0 and 119"
    );
  }

  return {
    title: MOCK_DATA[position].title,
    description: MOCK_DATA[position].description,
  };
}

/**
 * Retrieves a pseudo-random post from the API.
 *
 * @return {Promise} A promise that resolves to the fetched post data.
 */
export async function getPseudoRamdonData() {
  return fetch(API_URL, { headers: { "x-api-key": API_KEY } })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

// Memebers mock data
/**
 * Returns the data for a specific member in the MEMEBERS_MOCK array.
 *
 * @param {number} position - The position of the memeber in the array.
 *                           Must be between 0 and 119.
 * @return {{name: string, email: string}} - The data for the member at the specified position.
 */
export function getAprioriMemberData(position) {
  if (position < 0 || position > 9) {
    return new Error(
      "The memeber position in 'getAprioriMemberData' must be between 0 and 9"
    );
  }

  return {
    name: MOCK_DATA[position].name,
    wrongEmail: MOCK_DATA[position].wrongEmail,
    email: MOCK_DATA[position].email,
  };
}

/**
 * Retrieves a pseudo-random member from the API.
 *
 * @return {Promise} A promise that resolves to the fetched memeber data.
 */
export async function getPseudoRamdonMemeber() {
  return fetch(API_URL, { headers: { "x-api-key": API_KEY } })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
