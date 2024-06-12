import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs-extra";

console.log("-------------");

const data = fs.readFileSync("./src/store/Trace1.txt", "utf-8");
const lines = data.split("\n");
const finalLines: any[] = [];
lines.forEach((line, i) => {
  let finalLine = line.trim().replace(/^\s+|\s+$/gm, "");
  try {
    if (finalLine.slice(-4) === "}}0}") {
      finalLine = finalLine.replace("}}0}", "}");
    } else if (finalLine.slice(-1) === "}") {
      const regex = /}+$/;
      finalLine = finalLine.replace(regex, "}");
    } else {
      finalLine = finalLine + "}";
    }
    const json = JSON.parse(finalLine);
    finalLines.push(json);
  } catch (error) {
    console.log(`Error in index = ${i}`);
    console.log(`line = ${line}`);
    console.log(`finalLine = ${finalLine}`);
    console.error("Error parsing JSON:", error);
  }
});

// fs.writeFile("file.txt", JSON.stringify(finalLines), function (err) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log("File created!");
// });
// console.log(finalLines);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    TRACE_DATA: JSON.stringify(finalLines),
  },
});
