import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/actions/auth";
import { routes } from "@/constants/routes";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>註冊新帳號</CardTitle>
          <CardDescription>輸入 Email 和密碼建立新帳號</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">密碼</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" formAction={signup}>
                  註冊
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              已有帳號？{" "}
              <a href={routes.LOGIN} className="underline underline-offset-4">
                去登入
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
