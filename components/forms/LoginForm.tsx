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
import { login, signup } from "@/actions/auth";
import { routes } from "@/constants/routes";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>登入系統</CardTitle>
          <CardDescription>輸入 Email 登入使用系統</CardDescription>
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
                <div className="flex items-center">
                  <Label htmlFor="password">密碼</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    忘記密碼?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" formAction={login}>
                  登入
                </Button>
                <Button type="submit" className="w-full" formAction={signup}>
                  註冊
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              還沒有帳號？{" "}
              <a href={routes.SIGNUP} className="underline underline-offset-4">
                去註冊
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
