const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const Mustache = require("mustache");

let items = [
  { item: "Laptop", quantity: 1, pricePerUnit: 1999.99 },
  { item: "USB-C/USB-A adapter", quantity: 3, pricePerUnit: 12.7 },
  { item: "Charger", quantity: 1, pricePerUnit: 125.89 },
].map((item) => {
  item.price = item.quantity * item.pricePerUnit;
  return item;
});

const total = items.reduce((total, item) => total + item.price, 0).toFixed(2);

items = items.map((item) => {
  item.pricePerUnit = item.pricePerUnit.toFixed(2);
  item.price = item.price.toFixed(2);
  return item;
});

const data = {
  invoiceNumber: "#12345",
  companyDetails: ["Acme, Inc.", "3780  Woodlawn Drive", "53213 Milwaukee, WI"],
  customerDetails: ["Big Co.", "1570  Coventry Court", "39531 Biloxi, MS"],
  items,
  total,
};

const generation = {
  html: "template.html",
  assets: ["Inter-Regular.ttf", "Inter-Bold.ttf"],
  layout: {
    margin: {
      top: 25,
      left: 20,
      right: 20,
      bottom: 20,
    },
  },
};

const template = fs.readFileSync("./template.html", { encoding: "utf8" });
const filledTemplate = Mustache.render(template, data);
const interRegularFont = fs.createReadStream("./Inter-Regular.ttf");
const interBoldFont = fs.createReadStream("./Inter-Bold.ttf");

const body = new FormData();
body.append("template.html", filledTemplate, { filename: "template.html" });
body.append("generation", JSON.stringify(generation));
body.append("Inter-Regular.ttf", interRegularFont);
body.append("Inter-Bold.ttf", interBoldFont);

(async () => {
  const response = await axios.post("http://localhost:5000/process", body, {
    headers: body.getHeaders(),
    responseType: "stream",
  });
  await response.data.pipe(fs.createWriteStream("invoice.pdf"));
})();
