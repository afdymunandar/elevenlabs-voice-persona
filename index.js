import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load emotion config
const emotionFile = path.join(__dirname, "emotions.json");

if (!fs.existsSync(emotionFile)) {
  console.error("❌ emotions.json not found");
  process.exit(1);
}

const emotions = JSON.parse(fs.readFileSync(emotionFile, "utf-8"));

console.log("✅ App started");
console.log("Loaded emotions:");
console.table(
  Object.keys(emotions).map((key) => ({
    emotion: key,
    description: emotions[key].description
  }))
);
