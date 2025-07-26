"use server";

import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { CartItem } from "@/types/product";

export const createSale = async (payMethod: string, items: CartItem[]) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("使用者未登入");
  }

  const total_price = items.reduce(
    (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
    0
  );
  const total_quantity = items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  try {
    const result = await prisma.$transaction(async (tx) => {
      const sale = await tx.sales.create({
        data: {
          user_id: user.id,
          pay_method: payMethod,
          total_price: BigInt(total_price),
          total_quantity: BigInt(total_quantity),
        },
      });

      const saleProductPromises = items.map((item) =>
        tx.sale_product.create({
          data: {
            sale_id: sale.id,
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            flavors: item.flavors.map((flavor) => flavor.name),
          },
        })
      );

      const saleProducts = await Promise.all(saleProductPromises);

      return { sale, saleProducts };
    });

    return result;
  } catch (error) {
    throw error;
  }
};
