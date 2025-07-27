"use server";

import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { CartItem } from "@/types/product";

export const getAllSales = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("使用者未登入");
  }

  const userProfile = await prisma.profiles.findUnique({
    where: {
      id: user.id,
    },
    select: {
      company_id: true,
    },
  });

  if (!userProfile?.company_id) return [];

  const sales = await prisma.sales.findMany({
    where: {
      company_id: userProfile.company_id,
    },
    include: {
      profiles: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return sales;
};

export const createSale = async (payMethod: string, items: CartItem[]) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("使用者未登入");
  }

  const userProfile = await prisma.profiles.findUnique({
    where: {
      id: user.id,
    },
    select: {
      company_id: true,
    },
  });

  if (!userProfile?.company_id) {
    throw new Error("未授權的使用者");
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
          total_price: total_price,
          total_quantity: total_quantity,
          company_id: userProfile.company_id,
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
            company_id: userProfile.company_id,
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

export const getSaleById = async (saleId: number) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("使用者未登入");
  }

  const userProfile = await prisma.profiles.findUnique({
    where: {
      id: user.id,
    },
    select: {
      company_id: true,
    },
  });

  if (!userProfile?.company_id) {
    throw new Error("未授權的使用者");
  }

  const saleProducts = await prisma.sale_product.findMany({
    where: {
      company_id: userProfile.company_id,
      AND: { sale_id: saleId },
    },
    include: {
      products: true,
      sales: true,
    },
  });
  return saleProducts;
};

export const deleteSaleById = async (saleId: number) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("使用者未登入");
  }

  const userProfile = await prisma.profiles.findUnique({
    where: {
      id: user.id,
    },
    select: {
      company_id: true,
    },
  });

  if (!userProfile?.company_id) {
    throw new Error("未授權的使用者");
  }

  const sale = await prisma.sales.findUnique({
    where: {
      id: saleId,
      AND: { company_id: userProfile.company_id },
    },
  });

  if (!sale) {
    throw new Error("紀錄不存在 or 未授權的使用者");
  }

  await prisma.sales.delete({
    where: {
      id: sale.id,
    },
  });
};
