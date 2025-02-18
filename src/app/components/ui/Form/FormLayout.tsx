"use client";

import Image from "next/image";
import leftImg from '@/assets/form/2.png';
import rightImg from '@/assets/form/3.png';
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
    className?: string;
    width?: string;
}

export default function LayoutForm({
    children,
    className = "items-center justify-center",
    width = "md:w-[30rem]"
}: Props) {
    const router = useRouter();
    return (
        <div className={`flex w-full h-screen md:gap-8 lg:gap-10 ${className} flex-col relative`}>
            <div className={`w-full ${width} flex items-center flex-col`} >
                <Image src={rightImg} alt="right" className="absolute top-3 right-4 animate-leftRight hidden md:block sign-up-right-img" width={250} height={100} priority />
                <Image src={leftImg} alt="left" className="absolute bottom-1/3 left-4 animate-upDown hidden md:block sign-up-left-img" width={250} height={100} priority />
                <div className="flex items-center justify-center md:absolute md:left-52 lg:left-72 xl:left-80 md:top-10 mx-auto md:mx-0">
                    <Image src="https://res.cloudinary.com/dh8bebljc/image/upload/v1737951936/qordi2kpfy4uonzirqt0.png"  alt="logo" className="cursor-pointer logo-form" width={150} height={100} priority onClick={() => router.push('/')} />
                </div>
                {children}
            </div>
        </div>
    )
}