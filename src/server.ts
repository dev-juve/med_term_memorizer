import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MedicalTerm, MedicalTermData } from "./types";

const PORT = 3000;

// this function reads the terms from the JSON file.
function loadMedicalTerms(): MedicalTerm[] {
  const filePath = join(process.cwd(), "data", "medical-terms.json");
  const fileContents = readFileSync(filePath, "utf-8");
  const termDataList = JSON.parse(fileContents) as MedicalTermData[];

  if (!Array.isArray(termDataList)) {
    throw new Error("The JSON file must contain a list of medical terms.");
  }

  if (termDataList.length === 0) {
    throw new Error("The JSON file does not contain any terms.");
  }

  const medicalTerms: MedicalTerm[] = [];

  for (let i = 0; i < termDataList.length; i++) {
    const termData = termDataList[i];
    const medicalTerm = new MedicalTerm(termData);
    medicalTerms.push(medicalTerm);
  }

  return medicalTerms;
}

// this function sends data back as JSON.
function sendJson(response: ServerResponse, statusCode: number, data: unknown): void {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(data, null, 2));
}

// the server has one API endpoint: GET /api/terms.
const server = createServer(function (request: IncomingMessage, response: ServerResponse): void {
  try {
    if (request.method === "GET" && request.url === "/api/terms") {
      const terms = loadMedicalTerms();
      sendJson(response, 200, terms);
      return;
    }

    sendJson(response, 404, {
      message: "Endpoint not found. Use GET /api/terms."
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Could not load the medical terms:", error.message);
    } else {
      console.error("An unknown error happened while loading the terms.");
    }

    sendJson(response, 500, {
      message: "The server could not load the medical terms. Check the JSON file."
    });
  }
});

server.listen(PORT, function (): void {
  console.log("Medical Terminology API is running.");
  console.log("Open http://localhost:" + PORT + "/api/terms to see the terms.");
});
