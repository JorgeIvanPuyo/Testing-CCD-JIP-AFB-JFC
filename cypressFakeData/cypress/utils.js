import POST_MOCK_DATA from "../POST_MOCK_DATA.json";

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
    title: POST_MOCK_DATA[position].title,
    description: POST_MOCK_DATA[position].description,
  };
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
 * Retrieves a pseudo-random post from the API.
 *
 * @return {Promise} A promise that resolves to the fetched post data.
 */
export async function getPseudoRamdonPost() {
  return fetch(API_URL, { headers: { "x-api-key": API_KEY } })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
