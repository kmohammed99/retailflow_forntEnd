import { http } from "./apiClient";


// Helpers to normalize ResponseTransaction vs raw arrays
function unwrap(data) {
    return data?.responseBody ?? data;
}


export async function getAllProducts() {
    const data = await http.request("/products/all");
    return unwrap(data);
}


export async function getProductById(id) {
    const data = await http.request(`/products/${id}`);
    return unwrap(data);
}


export async function createProduct(product) {
    const payload = {
        brandId: product.brandId ?? 2, // TODO: wire real brand picker
        name: product.name,
        category: product.category || "General",
        sku: String(product.sku ?? product.code),
        colors: product.colors ?? ["Default"],
        sizes: product.sizes ?? ["Free"],
        costPrice: Number(product.costPrice ?? 0),
        sellingPrice: Number(product.sellingPrice ?? product.price ?? 0),
        minimumStock: Number(product.minimumStock ?? 0),
        totalQuantity: Number(product.totalQuantity ?? product.qty ?? 0),
    };
    const data = await http.request("/products", { method: "POST", body: payload });
    return unwrap(data);
}


export async function updateProduct(id, product) {
    const payload = {
        brandId: product.brandId ?? 2, // keep same fallback for now
        name: product.name,
        category: product.category || "General",
        sku: String(product.sku ?? product.code),
        costPrice: Number(product.costPrice ?? 0),
        sellingPrice: Number(product.sellingPrice ?? product.price ?? 0),
        minimumStock: Number(product.minimumStock ?? 0),
        totalQuantity: Number(product.totalQuantity ?? product.qty ?? 0),
    };
    const data = await http.request(`/products/${id}`, { method: "PUT", body: payload });
    return unwrap(data);
}


export async function deleteProduct(id) {
    await http.request(`/products/${id}`, { method: "DELETE" });
    return true;
}