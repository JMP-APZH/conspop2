const express = require("express");
const { PrismaClient } = require("./generated/prisma_client");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Get all users
app.get("/", async (req, res) => {
  const userCount = await prisma.idea.count();
  res.json(
    userCount == 0
      ? "No idea have been added yet."
      : "Some ideas have been added to the database."
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});