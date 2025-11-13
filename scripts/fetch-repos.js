import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.GH_TOKEN;
const username = "jojohyperbackend-hub";

async function main() {
  if (!token) {
    console.error("❌ GH_TOKEN not found in .env file");
    process.exit(1);
  }

  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
    headers: { Authorization: `token ${token}` },
  });

  if (!res.ok) {
    console.error(`❌ GitHub API error: ${res.statusText}`);
    process.exit(1);
  }

  const data = await res.json();

  const list = data
    .slice(0, 6)
    .map(
      (repo) =>
        `- [${repo.name}](${repo.html_url}) — ⭐ ${repo.stargazers_count}`
    )
    .join("\n");

  fs.writeFileSync("PROJECTS.md", `## 🚀 Active Projects\n\n${list}\n`);
  console.log("✅ PROJECTS.md updated!");
}

main();
