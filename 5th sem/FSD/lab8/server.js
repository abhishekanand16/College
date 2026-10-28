import cors from "cors";
import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const IMPORTS_DIR = path.join(DATA_DIR, "imports");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Rice", price: 450, expiryDate: "2026-12-01" },
  { id: 2, name: "Laptop", price: 55000, expiryDate: "2028-06-15" },
  { id: 3, name: "Soap", price: 35, expiryDate: "2027-03-20" },
  { id: 4, name: "Notebook", price: 120, expiryDate: "2030-01-01" },
  { id: 5, name: "Headphones", price: 899, expiryDate: "2029-08-10" },
  { id: 6, name: "Milk", price: 60, expiryDate: "2026-10-30" },
];

function ensureDataDirs() {
  fs.mkdirSync(IMPORTS_DIR, { recursive: true });
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(DEFAULT_PRODUCTS, null, 2));
  }
}

function readProducts() {
  ensureDataDirs();
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
}

function writeProducts(products) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

function normalizeHeader(key) {
  return String(key).trim().toLowerCase().replace(/\s+/g, "");
}

function formatExpiry(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return text;
}

function parseProductsFromWorkbook(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("Excel file has no sheets.");
  }
  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: "",
  });
  if (rows.length === 0) {
    throw new Error("Excel sheet is empty.");
  }

  const products = rows.map((row, index) => {
    const mapped = {};
    for (const [key, value] of Object.entries(row)) {
      const h = normalizeHeader(key);
      if (h === "name" || h === "productname") mapped.name = String(value).trim();
      else if (h === "price") mapped.price = Number(value);
      else if (h === "expirydate" || h === "expiry" || h === "expdate") {
        mapped.expiryDate = formatExpiry(value);
      }
    }
    if (!mapped.name) {
      throw new Error(`Row ${index + 2}: missing product name.`);
    }
    if (Number.isNaN(mapped.price)) {
      throw new Error(`Row ${index + 2}: invalid price.`);
    }
    return {
      id: index + 1,
      name: mapped.name,
      price: mapped.price,
      expiryDate: mapped.expiryDate || "—",
    };
  });

  return products;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    ensureDataDirs();
    cb(null, IMPORTS_DIR);
  },
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^\w.-]/g, "_");
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".xlsx" || ext === ".xls") cb(null, true);
    else cb(new Error("Only .xlsx and .xls files are allowed."));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", (_req, res) => {
  res.json(readProducts());
});

app.post("/api/products/import", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    const buffer = fs.readFileSync(req.file.path);
    const products = parseProductsFromWorkbook(buffer);
    writeProducts(products);
    res.json({
      message: "Import successful.",
      savedAs: path.basename(req.file.path),
      products,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || "Import failed." });
  }
});

const PORT = process.env.PORT || 3001;
ensureDataDirs();
app.listen(PORT, () => {
  console.log(`Product API running at http://localhost:${PORT}`);
});
