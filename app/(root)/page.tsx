import OrderPage from "./OrderPage";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, imageSrc, is_active, created_at")
    .eq("is_active", true);

  const { data: flavors } = await supabase
    .from("flavors")
    .select("id, name, created_at, is_active")
    .eq("is_active", true);

  return <OrderPage products={products ?? []} flavors={flavors ?? []} />;
}
