"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    // Здесь можно вызвать API регистрации
    console.log({ email, password });
    router.push("/login");
  };

  return (
    <div className="flex h-[930px] items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Регистрация</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 text-black"
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 text-black"
            required
          />
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 text-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Уже есть аккаунт?{" "}
          <a href="/auth" className="text-blue-600 hover:underline">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
}
