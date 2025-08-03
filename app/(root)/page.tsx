import OrderPage from "./OrderPage";
import { createClient, getCurrentUser } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("id, company_id")
    .eq("id", user?.id)
    .single();

  const { data: products } = await supabase
    .from("products")
    .select("id, name, price, imageSrc, is_active, created_at")
    .eq("is_active", true)
    .eq("company_id", userProfile?.company_id);

  const { data: flavors } = await supabase
    .from("flavors")
    .select("id, name, created_at, is_active")
    .eq("is_active", true)
    .eq("company_id", userProfile?.company_id);

  return <OrderPage products={products ?? []} flavors={flavors ?? []} />;
}
