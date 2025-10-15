"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useNotificationManager } from "@/hooks/notification-context";
import axi from "@/utils/api";

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegistrationModal({
  open,
  onOpenChange,
}: RegistrationModalProps) {
  const { addNotification } = useNotificationManager();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const formData = new FormData();

    formData.append("email", data.get("email") as string);
    formData.append("login", data.get("login") as string);
    formData.append("password", data.get("password") as string);
    formData.append("password2", data.get("password2") as string);

    try {
      setLoading(true);

      // Пока API нет — просто имитация успешной регистрации
      // Потом здесь можно будет заменить на:
      // const res = await axi.post("/account/register", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addNotification({
        id: Date.now().toString(),
        title: "Регистрация успешна",
        description: "Ваш аккаунт был создан (демо-режим).",
        status: 200,
        createdAt: new Date().toISOString(),
      });

      form.reset();
      onOpenChange(false);
    } catch (err) {
      addNotification({
        id: Date.now().toString(),
        title: "Ошибка регистрации",
        description: "Не удалось создать аккаунт. Попробуйте позже.",
        status: 500,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Регистрация
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Введите email"
              className="mt-1"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <Label htmlFor="login">Логин</Label>
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
            <Label htmlFor="password">Пароль</Label>
            <Input
              name="password"
              type="password"
              placeholder="Введите пароль"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password2">Повторите пароль</Label>
            <Input
              name="password2"
              type="password"
              placeholder="Повторите пароль"
              className="mt-1"
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Регистрируем..." : "Зарегистрироваться"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
