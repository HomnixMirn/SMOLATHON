"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user-context";
import { useNotificationManager } from "@/hooks/notification-context";
import { useRouter } from "next/navigation";
import axi from "@/utils/api";

export default function Logout() {
  const router = useRouter();
  const { clearUser } = useUser();
  const { addNotification } = useNotificationManager();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        addNotification({
          id: Date.now().toString(),
          title: "Ошибка",
          description: "Токен не найден",
          status: 401,
          createdAt: new Date().toISOString(),
        });
        return;
      }

      const res = await axi.get("/account/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        localStorage.removeItem("token");
        clearUser?.();

        addNotification({
          id: Date.now().toString(),
          title: "Успешный выход",
          description: "Вы вышли из аккаунта",
          status: 200,
          createdAt: new Date().toISOString(),
        });

        // ✅ Навигация через Next.js
        router.push("/");
      }
    } catch (err) {
      localStorage.removeItem("token");
      clearUser?.();

      addNotification({
        id: Date.now().toString(),
        title: "Выход выполнен",
        description: "Сессия завершена локально",
        status: 200,
        createdAt: new Date().toISOString(),
      });

      router.push("/");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="text-black hover:bg-red-50 hover:text-red-600"
    >
      Выйти
    </Button>
  );
}
