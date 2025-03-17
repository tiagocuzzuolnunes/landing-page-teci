import Image from "next/image";
import logoTeciSmall from "../../public/logoTeciSmall.svg";

export default function Header() {
    return(
        <header className="flex h-[64px] shadow-lg">
            <Image src={logoTeciSmall}
            alt="Logo Tecí Semijoias"
            className="w-auto h-full ml-2 p-2" />
        </header>
    )
}