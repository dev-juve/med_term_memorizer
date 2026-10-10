import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { MedicalTermData } from "./types";

const API_URL = "http://localhost:3000/api/terms";

// this function asks the API for the medical terms.
async function getAllMedicalTerms(): Promise<MedicalTermData[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("The API returned an error. Check the API server.");
  }

  const receivedTerms: unknown = await response.json();

  if (!Array.isArray(receivedTerms)) {
    throw new Error("The API did not return a list of medical terms.");
  }

  if (receivedTerms.length === 0) {
    throw new Error("The API returned an empty list of medical terms.");
  }

  return receivedTerms as MedicalTermData[];
}

// this recursive function finds the next term the user has not seen yet.
function findNextTermRecursively(
  terms: MedicalTermData[],
  viewedTermIds: number[],
  index: number
): MedicalTermData | null {
  if (index >= terms.length) {
    return null;
  }

  const currentTerm = terms[index];

  if (!viewedTermIds.includes(currentTerm.id)) {
    return currentTerm;
  }

  return findNextTermRecursively(terms, viewedTermIds, index + 1);
}

// this function prints one term and its translation.
function displayTerm(term: MedicalTermData): void {
  console.log("\n----------------------------------------");
  console.log("English term: " + term.englishTerm);
  console.log("Haitian Creole: " + term.haitianCreole.join("; "));
  console.log("Category: " + term.category);
  console.log("Source PDF page(s): " + term.sourcePdfPages.join(", "));
  console.log("----------------------------------------");
}

async function main(): Promise<void> {
  try {
    const terms = await getAllMedicalTerms();
    const userInput = createInterface({ input: stdin, output: stdout });
    const viewedTermIds: number[] = [];

    console.log("Welcome to the Medical Terminology Trainer!");
    console.log("The program will show one English term and its Haitian Creole translation at a time.");
    console.log("There are " + terms.length + " terms in the current list.");

    try {
      while (true) {
        let term = findNextTermRecursively(terms, viewedTermIds, 0);

        if (term === null) {
          console.log("\nYou have reviewed every term. The list will start again.\n");
          viewedTermIds.length = 0;
          term = findNextTermRecursively(terms, viewedTermIds, 0);
        }

        if (term === null) {
          throw new Error("No medical terms are available to display.");
        }

        displayTerm(term);
        viewedTermIds.push(term.id);

        const answer = await userInput.question("Press Enter for the next term, or type quit to exit: ");

        if (answer.trim().toLowerCase() === "quit") {
          console.log("Thank you for studying medical terminology. Goodbye!");
          break;
        }
      }
    } finally {
      userInput.close();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("The program could not continue: " + error.message);
      console.error("Make sure the API is running in another terminal.");
    } else {
      console.error("An unknown error happened.");
    }
  }
}

main();
