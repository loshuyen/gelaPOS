import OrderPage from "./OrderPage";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, imageSrc");

  const { data: flavors } = await supabase
    .from("flavors")
    .select("id, name")
    .eq("is_active", true);

  return <OrderPage products={products ?? []} flavors={flavors ?? []} />;
}
