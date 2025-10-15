"use client";

import { useUser } from "@/hooks/user-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isLoading && isClient) {
      const token = localStorage.getItem("token");
      const username = user?.username;

      // Проверка доступа
      if (!token || username !== "admin") {
        setIsAllowed(false);
        router.replace("/not-found");
      } else {
        setIsAllowed(true);
      }
    }
  }, [user, isLoading, isClient, router]);

  // Показываем загрузку, пока идёт проверка
  if (!isClient || isLoading || isAllowed === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Если доступ запрещён — вообще ничего не рендерим
  if (isAllowed === false) {
    return null;
  }

  // ✅ Контент рендерится только если всё проверено и разрешено
  return (
    <div className="flex min-h-screen">
      <main
        className="flex-1 overflow-y-auto"
        style={{ scrollbarGutter: "stable" }}
      >
        {children}
      </main>
    </div>
  );
}
