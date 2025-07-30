"use server";

import { getCurrentUser } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { routes } from "@/constants/routes";

export const getAllFlavors = async () => {
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

  const flavors = await prisma.flavors.findMany({
    where: {
      company_id: userProfile.company_id,
    },
    select: {
      id: true,
      name: true,
      created_at: true,
      is_active: true,
    },
    orderBy: {
      is_active: "desc",
    },
  });
  return flavors;
};

export async function updateFlavorStatuses(
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

  const flavorIds = updates.map((u) => u.id);
  const flavors = await prisma.flavors.findMany({
    where: {
      id: { in: flavorIds },
    },
    select: {
      id: true,
      company_id: true,
    },
  });

  const invalidFlavor = flavors.find((p) => p.company_id !== companyId);
  if (invalidFlavor) {
    throw new Error("未授權的操作");
  }

  const foundIds = new Set(flavors.map((p) => p.id));
  const missingId = flavorIds.find((id) => !foundIds.has(id));
  if (missingId !== undefined) {
    throw new Error("無此口味");
  }

  const operations = updates.map(({ id, is_active }) =>
    prisma.flavors.update({
      where: { id },
      data: { is_active },
    })
  );

  await prisma.$transaction(operations);

  revalidatePath(routes.PRODUCTS);
}

export async function updateFlavor(formData: FormData) {
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
  const id = Number(formData.get("id"));
  const name = formData.get("name");
  if (!name || typeof name !== "string") {
    throw new Error("名稱欄位缺失或無效");
  }

  const flavor = await prisma.flavors.findUnique({
    where: {
      id: Number(id),
      company_id: companyId,
    },
    select: {
      id: true,
    },
  });

  if (!flavor) throw new Error("未授權的使用者");

  await prisma.flavors.update({
    where: { id: Number(id) },
    data: {
      name,
    },
  });

  revalidatePath(routes.PRODUCTS);
}

export async function createFlavor(formData: FormData) {
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

  if (typeof name !== "string") throw new Error("name must be text.");

  await prisma.flavors.create({
    data: { name, company_id: userProfile.company_id },
  });

  revalidatePath(routes.PRODUCTS);
}
