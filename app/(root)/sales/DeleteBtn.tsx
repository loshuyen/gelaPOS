"use client";

import { useRouter } from "next/navigation";
import { HtmlHTMLAttributes } from "react";

interface DeleteBtnProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  handleDelete: () => Promise<void>;
}

const DeleteBtn = ({ handleDelete, children }: DeleteBtnProps) => {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await handleDelete();
        router.refresh();
      }}
    >
      {children}
    </button>
  );
};

export default DeleteBtn;
