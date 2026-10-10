# Overview

As a student learning Software Development, I am building a small TypeScript application to practice programming skills and learn how to work with JSON data and APIs.

The Medical Terminology Memorizer helps interpreters learn English medical terms and their Haitian Creole equivalents. The program gets terminology from a small API that I built. It displays one term in the console at a time and lets the user press Enter to continue or type `quit` to leave the program.

The terminology is stored in a JSON file created from the attached English-Haitian Creole medical dictionary. The current file contains 287 entries from selected pages of the dictionary. It is a starter dataset and does not yet include every term in the full dictionary.

My purpose for writing this software is to practice core TypeScript concepts, including variables, conditionals, loops, functions, arrays, classes, asynchronous functions, recursion, JSON data, terminal input and output, and throwing and handling exceptions.

# Development Environment

* I use TypeScript to write the application logic.
* I use Node.js to run the API and the console program.
* I use npm scripts to start the API, start the learning program, and compile the TypeScript files.
* I store the medical terminology in a JSON file so the API can read and return the terms.
* I use the TypeScript compiler to turn the source files into JavaScript files that Node.js can run.


## How to Run the Program

You need Node.js 20 or newer and npm.

1. Open a terminal in the `medical-terminology-trainer` folder. Then run the follwing command to install the dependencies

```bash
npm install
```

2. Start the API by running:

   ```bash
   npm run api
   ```

3. Open a second terminal in the same folder and start the learning program:

   ```bash
   npm run learn
   ```

4. Press Enter to see the next term. Type `quit` when you want to exit.

While the API is running, you can open <http://localhost:3000/api/terms> in a browser to see all the terminology entries returned by the endpoint.


# Useful Websites

* [TypeScript Handbook](https://www.typescriptlang.org/docs/)
* [Node.js Documentation](https://nodejs.org/docs/latest/api/)
* [Node.js HTTP Module](https://nodejs.org/api/http.html)
* [Node.js Readline Documentation](https://nodejs.org/api/readline.html)
* [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [MDN Web Docs - JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)


# Future Work

* Add more medical terminology by reviewing the remaining pages of the dictionary and checking each entry against the source.
* Add an endpoint for searching terms by English word or filtering them by category if the application needs it.
* Add definitions, example sentences, and pronunciation help when reliable sources for that information are available.
* Add a quiz mode so interpreters can test how well they remember the translations.
* Add tests to check the JSON data for missing fields, duplicate IDs, and inconsistent entries.
