"use client";

import { useRouter } from "next/navigation";
import { HtmlHTMLAttributes } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";

interface DeleteBtnProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  handleDelete: () => Promise<void>;
}

const DeleteBtn = ({ handleDelete }: DeleteBtnProps) => {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>刪除</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確定要刪除紀錄嗎？</AlertDialogTitle>
          <AlertDialogDescription>
            資料無法復原，確認後將永久刪除紀錄
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await handleDelete();
              router.push(routes.SALES);
            }}
          >
            確認
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;
