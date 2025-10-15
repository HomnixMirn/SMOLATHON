"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/user-context";
import AuthenticationModal from "@/app/auth/page";  
import Logout from "@/components/logout/page";
import RegistrationModal from "@/app/register/page";

export default function Header() {
  const [openAuth, setOpenAuth] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Проверяем токен и имя пользователя
    if (token && user && (user.username === "admin" || user.login === "admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  return (
    <header className="flex justify-center bg-white shadow-sm py-3">
      <div className="flex items-center justify-around max-w-[800px] min-w-[375px] w-full">
        <Link href="/" className="text-black hover:underline">
          Главная страница
        </Link>

        {/* Если юзер админ — показываем кнопку в админку */}
        {isAdmin && (
        <Link href="/admin">
            <Button variant="outline" className="text-black font-semibold">
            Админ
            </Button>
        </Link>
        )}


        {!user ? (
          <>
            <Button variant="outline" onClick={() => setOpenAuth(true)}>
              Вход
            </Button>
            <Button variant="outline" onClick={() => setOpenRegister(true)}>
              Регистрация
            </Button>

            <AuthenticationModal open={openAuth} onOpenChange={setOpenAuth} />
            <RegistrationModal open={openRegister} onOpenChange={setOpenRegister} />
          </>
        ) : (
          <Logout />
        )}
      </div>
    </header>
  );
}
