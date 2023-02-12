import crypto from "crypto";
import fs from "fs/promises";

const now = new Date();
const people = ["Bob", "Sam", "Tom", "John", "Vlad"];
let endDate = new Date(now);
endDate.setMonth(now.getMonth() - 2);
endDate.setDate(0);

const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatePurchases = () => {
  const startDate = new Date(now);

  const purchases = [];

  while (startDate.getTime() > endDate.getTime()) {
    purchases.push({
      amount: randomNumberBetween(1, 20000) / 100,
      id: crypto.randomUUID(),
      timestamp: startDate.toISOString(),
    });

    startDate.setDate(startDate.getDate() - randomNumberBetween(1, 21));
  }

  return purchases;
};

const data = people.map((person) => ({
  id: crypto.randomUUID(),
  name: person,
  purchases: generatePurchases(),
}));

fs.writeFile("./public/user-data.json", JSON.stringify(data, null, 2));
