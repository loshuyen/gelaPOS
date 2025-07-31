"use server";

import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { routes } from "@/constants/routes";
import { revalidatePath } from "next/cache";

export const getAllProducts = async () => {
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

  const products = await prisma.products.findMany({
    where: {
      company_id: userProfile.company_id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      imageSrc: true,
      is_active: true,
      created_at: true,
    },
    orderBy: {
      is_active: "desc",
    },
  });
  return products;
};

export async function updateProductStatuses(
  updates: { id: number; is_active: boolean }[]
) {
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

  const companyId = userProfile.company_id;

  const productIds = updates.map((u) => u.id);
  const products = await prisma.products.findMany({
    where: {
      id: { in: productIds },
    },
    select: {
      id: true,
      company_id: true,
    },
  });

  const invalidProduct = products.find((p) => p.company_id !== companyId);
  if (invalidProduct) {
    throw new Error("未授權的操作");
  }

  const foundIds = new Set(products.map((p) => p.id));
  const missingId = productIds.find((id) => !foundIds.has(id));
  if (missingId !== undefined) {
    throw new Error("無此商品");
  }

  const operations = updates.map(({ id, is_active }) =>
    prisma.products.update({
      where: { id },
      data: { is_active },
    })
  );

  await prisma.$transaction(operations);

  revalidatePath(routes.PRODUCTS);
}

export async function updateProduct(formData: FormData) {
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

  const companyId = userProfile.company_id;
  const raw = Object.fromEntries(formData.entries());
  const { id, ...rest } = raw;
  const data = { ...rest };

  const product = await prisma.products.findUnique({
    where: {
      id: Number(id),
      company_id: companyId,
    },
    select: {
      id: true,
    },
  });

  if (!product) throw new Error("未授權的使用者");

  // @ts-expect-error price is number in database
  if ("price" in data) data.price = Number(data.price);

  await prisma.products.update({
    where: { id: Number(id) },
    data,
  });

  revalidatePath(routes.PRODUCTS);
}

export async function createProduct(formData: FormData) {
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

  const name = formData.get("name");
  const price = Number(formData.get("price"));

  if (typeof name !== "string") throw new Error("name must be text.");

  await prisma.products.create({
    data: { name, price, company_id: userProfile.company_id },
  });

  revalidatePath(routes.PRODUCTS);
}

export async function deleteProductById(id: number) {
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

  const companyId = userProfile.company_id;

  const product = await prisma.products.findUnique({
    where: {
      id,
      AND: { company_id: companyId },
    },
    select: {
      id: true,
    },
  });

  if (!product) throw new Error("未授權的使用者");

  await prisma.products.delete({
    where: { id },
  });

  revalidatePath(routes.PRODUCTS);
}
