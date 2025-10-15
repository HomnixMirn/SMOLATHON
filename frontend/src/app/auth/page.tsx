"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useUser } from "@/hooks/user-context";
import Logout from "@/components/logout/page";
import { useNotificationManager } from "@/hooks/notification-context";
import axi from "@/utils/api";

export default function AuthenticationModal() {
  const { user, fetchUser } = useUser();
  const { addNotification } = useNotificationManager();
  const [open, setOpen] = useState(!user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget; // ✅ сохраняем ссылку до await
  const data = new FormData(form);
  const formData = new FormData();
  formData.append("login", data.get("login") as string);
  formData.append("password", data.get("password") as string);

  try {
    setLoading(true);
    const res = await axi.post("/account/login", formData, {
      validateStatus: () => true,
    });

    if (res.status === 200 && res.data.token) {
      localStorage.setItem("token", res.data.token);

      let userData = null;
      if (res.data.user) {
        userData = res.data.user;
      } else {
        userData = await fetchUser?.();
      }

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      addNotification({
        id: Date.now().toString(),
        title: "Успешная авторизация",
        description: "Добро пожаловать!",
        status: 200,
        createdAt: new Date().toISOString(),
      });

      form.reset(); // ✅ теперь form — надёжная ссылка
      setOpen(false);
    } else {
      addNotification({
        id: Date.now().toString(),
        title: "Ошибка авторизации",
        description: res.data?.message || "Неверный логин или пароль",
        status: res.status,
        createdAt: new Date().toISOString(),
      });
    }
  } finally {
    setLoading(false);
  }
};


  if (user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Logout />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Авторизация
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="login">Username</Label>
            <Input
              name="login"
              type="text"
              placeholder="Введите имя пользователя"
              className="mt-1"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Введите пароль"
              className="mt-1"
              autoComplete="new-password"
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Входим..." : "Войти"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
