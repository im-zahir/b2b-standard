import { supabase } from "./supabase";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: Record<string, string>;
  image_url: string;
  datasheet_url?: string;
  created_at?: string;
}

export async function getProducts(category?: string | null) {
  let query = supabase.from("products").select("*");
  
  if (category) {
    query = query.eq("category", category);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  
  return data as Product[];
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
    
  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
  
  return data as Product;
}
