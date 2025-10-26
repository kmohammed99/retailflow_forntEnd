// // src/api/apiClient.js

// Lightweight fetch wrapper with JSON + error handling
const BASE_URL = "http://localhost:8080/api";


async function request(path, { method = "GET", body, headers } = {}) {
const res = await fetch(`${BASE_URL}${path}`, {
method,
headers: {
"Content-Type": "application/json",
Accept: "application/json",
...(headers || {}),
},
body: body ? JSON.stringify(body) : undefined,
});


const text = await res.text(); // keep raw for debugging
let json;
try { json = text ? JSON.parse(text) : null; } catch (_) { json = null; }


if (!res.ok) {
// Unify error message surface
const msg = `API ${method} ${path} -> ${res.status} ${res.statusText}\n${text}`;
throw new Error(msg);
}


return json ?? {}; // some endpoints return ResponseTransaction, others raw
}


export const http = { request };

// const BASE_URL = "http://localhost:8080/api";

// export async function createProduct(product) {
//   const res = await fetch(`${BASE_URL}/products`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(product),
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`API error ${res.status}: ${errorText}`);
//   }

//   return res.json();
// }

// // ✅ متطابق الآن مع الـ backend
// export async function getAllProducts() {
//   const res = await fetch(`${BASE_URL}/products/all`);
//   if (!res.ok) throw new Error(`API error ${res.status}`);
//   return res.json();
// }

// export async function getProductById(id) {
//   const res = await fetch(`${BASE_URL}/products/${id}`);
//   if (!res.ok) throw new Error(`API error ${res.status}`);
//   return res.json();
// }

// export async function deleteProduct(id) {
//   const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
//   if (!res.ok) throw new Error(`API error ${res.status}`);
//   return true;
// }
// // ✅ Update product by ID
// export async function updateProduct(id, product) {
//   const payload = {
//     name: product.name,
//     category: product.category,
//     sku: String(product.code),       // أو أي قيمة مناسبة
//     costPrice: 0,                    // لو لسه مش عندك قيم حقيقية
//     sellingPrice: product.price ? parseFloat(product.price) : 0,
//     minimumStock: 0,
//     totalQuantity: product.qty,
//     brandId: null,
//     colors: [],
//     sizes: [],
//   };

//   console.log("🚀 Sending update payload:", payload);

//   const res = await fetch(`${BASE_URL}/products/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`API error ${res.status}: ${errorText}`);
//   }

//   return res.json();
// }
