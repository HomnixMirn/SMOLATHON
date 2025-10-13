import Link from "next/link"
export default function Haeder(){
    return(
        <header className="flex justify-center bg-white max-w-[1920px] min-w-[385px]">
            <div className="flex items-center justify-around max-w-[800px] min-w-[375px]">
                <Link href={"/"} className="text-black">Главаная страница</Link>
                <Link href={"/auth"} className="text-black">Авторизация</Link>
                <Link href={"/register"} className="text-black">Регистрация</Link>
            </div>
        </header>
        )
}