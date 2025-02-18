"use client";


import { Errors } from '@/types';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import * as Yup from 'yup';

import bg from '@/assets/form/1.jpg';
import facebook from '@/assets/form/facebook.png';
import google from '@/assets/form/google.png';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';

const formData = {
    username: '',
    password: '',
}

export default function Page() {

    const router = useRouter()
    const [form, setForm] = useState<typeof formData>(formData)
    const [errors, setErrors] = useState<Errors>({})
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please enter your username"),
        password: Yup.string().required("Please enter your password"),
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await validationSchema.validate(form, { abortEarly: false });
            const data = {
                username: form.username,
                password: form.password,
            };

            setLoading(true);
            return console.log('data', data);

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages: Errors = {};
                let firstErrorPath: string | null = null;

                err.inner.forEach(error => {
                    if (error.path) {
                        errorMessages[error.path] = error.message;
                        if (!firstErrorPath || error.path === 'username') {
                            firstErrorPath = error.path;
                        }
                    }
                });

                if (firstErrorPath) {
                    if (firstErrorPath === 'username' && usernameRef.current) {
                        usernameRef.current.focus();
                    } else if (firstErrorPath === 'password' && passwordRef.current) {
                        passwordRef.current.focus();
                    }
                }

                setErrors(errorMessages);

            } else {
                console.log('this error', err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-[100dvh] md:gap-8 lg:gap-10">
            <div className="form-left w-full md:w-[42rem] xl:w-[45rem] border-r border-gray-100 px-10 md:px-20 bg-white custom-shadow-2 md:rounded-tr-2xl md:rounded-br-2xl flex items-center justify-center flex-col relative">
                <div className="mb-10 md:mb-14">
                    <Image src="https://res.cloudinary.com/dh8bebljc/image/upload/v1737951936/qordi2kpfy4uonzirqt0.png" alt="logo" className="logo-login cursor-pointer" width={150} height={100} priority onClick={() => router.push('/')} />
                </div>
                <form onSubmit={handleSubmit} className="inline-flex justify-center flex-col gap-2 md:gap-4 w-full">
                    <div className="form-item relative">
                        <label className="font-medium">Username<span className="text-red-500">*</span></label>
                        <div className="mt-2 ">
                            <input
                                className={`${errors.username && '!border !border-red-500'} input pr-10 rounded-lg focus:ring-0`}
                                type="text"
                                ref={usernameRef}
                                autoComplete={'username'}
                                autoFocus
                                name="username"
                                placeholder="Enter your username"
                                onChange={(e) => {
                                    setForm({ ...form, username: e.target.value })
                                    if (errors.username) {
                                        setErrors({ ...errors, username: '' })
                                    }
                                }}
                            />
                        </div>
                        {
                            errors.username && <span className="error">{errors.username}</span>
                        }
                    </div>
                    <div className="form-item relative">
                        <label className="font-medium">Password <span className="text-red-500">*</span></label>
                        <div className="mt-2 relative w-full">
                            <input
                                className={`${errors.password && '!border !border-red-500'} input pr-10 rounded-lg focus:ring-0`}
                                type={showPassword ? 'text' : 'password'}
                                ref={passwordRef}
                                name="password"
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setForm({ ...form, password: e.target.value })
                                    if (errors.password) {
                                        setErrors({ ...errors, password: '' })
                                    }
                                }}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <span className="cursor-pointer text-xl text-gray-2 text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                                </span>
                            </div>
                        </div>
                        {
                            errors.password && <span className="error">{errors.password}</span>
                        }
                    </div>
                    <Button
                        disabled={loading}
                        type="submit"
                        className="bg-primary custom-loading disabled:bg-primary/70 disabled:cursor-wait text-white py-0.5 w-full relative flex items-center justify-center mt-2 md:mt-1"
                    >
                        {loading && <AiOutlineLoading className="h-4 w-4 md:h-6 md:w-6 animate-spin mr-2" />} <span className="whitespace-nowrap">Login</span>
                    </Button>
                    <Link href="/forgot-password" className="w-fit text-primary text-sm md:text-base underline">For got password</Link>
                    <div className="border-or">
                        <p
                            className="mx-2 mb-0 text-center text-gray-500 text-sm md:text-base">
                            or
                        </p>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <div className="bg-gray-100 w-full inline-flex justify-center items-center py-2 rounded-md gap-2 cursor-pointer">
                            <Image src={google} width={24} alt="google" /> <span className="text-sm md:text-base">Google</span>
                        </div>
                        <div className="bg-gray-100 w-full inline-flex justify-center items-center py-2 rounded-md gap-2 cursor-pointer" >
                            <Image src={facebook} width={24} alt="facebook" /> <span className="text-sm md:text-base">Facebook</span>
                        </div>
                    </div>
                    <div className="absolute bottom-6 md:bottom-10 w-full text-center transform -translate-x-1/2 left-1/2">
                        <span className="text-sm md:text-base">Do not have account yet? </span> <Link href="/sign-up" className="w-fit text-primary text-sm md:text-base underline">Create Account</Link>
                    </div>
                </form>
            </div>
            <div className="form-right w-full justify-end items-center hidden md:flex overflow-hidden">
                <Image src={bg} alt="bg" className="rounded-tl-xl rounded-bl-xl bg-img object-cover" />
            </div>
        </div>
    )
}