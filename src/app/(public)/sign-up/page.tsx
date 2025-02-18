"use client";


import { Errors } from '@/types';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import * as Yup from 'yup';

import facebook from '@/assets/form/facebook.png';
import google from '@/assets/form/google.png';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';


import LayoutForm from '@/app/components/ui/Form/FormLayout';
import { ValidatePassword } from '@/app/utils';

const formData = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
}

export default function Page() {
    const [form, setForm] = useState<typeof formData>(formData)
    const [errors, setErrors] = useState<Errors>({})
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Please enter your email"),
        fullName: Yup.string().required("Please enter your full name"),
        password: Yup.string().required("Please enter your password"),
        confirmPassword: Yup.string().required("Please enter your confirm password"),
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const trimmedValue = value.replace(/\s/g, ''); // Remove spaces
        setForm(prevForm => ({ ...prevForm, [name]: trimmedValue }));

        if (name === 'password' || name === 'confirmPassword') {
            const { isValid, errors: validationErrors } = ValidatePassword(value);
            let errorMessages = '';

            if (!isValid) {
                errorMessages = Object.keys(validationErrors)
                    .filter(key => validationErrors[key])
                    .map(key => {
                        const errorMessagesMap: { [key: string]: string } = {
                            'length': "Password must be at least 8 characters",
                            'uppercase': "Password must contain at least one uppercase letter",
                            'number': "Password must contain at least one number",
                        };
                        return errorMessagesMap[key] || '';
                    }).find(Boolean) || '';
            }

            setErrors(prevErrors => ({
                ...prevErrors,
                password: name === 'password' ? errorMessages : prevErrors.password,
                confirmPassword: name === 'confirmPassword' && value !== form.password ? 'Password does not match' : '',
            }));
        } else if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { password, confirmPassword } = form;
        const passwordValidation = ValidatePassword(password);

        if (!passwordValidation.isValid && password) return;

        if (confirmPassword !== password) {
            setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Password does not match' }));
            return;
        }

        try {
            await validationSchema.validate(form, { abortEarly: false });
            const data = {
                email: form.email,
                fullName: form.fullName,
                password: form.password,
                confirmPassword: form.confirmPassword,
            };

            return console.log('data', data
            );
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages: Errors = {};
                let firstErrorPath: string | null = null;

                err.inner.forEach(error => {
                    if (error.path) {
                        errorMessages[error.path] = error.message;
                        if (!firstErrorPath || error.path === 'email') {
                            firstErrorPath = error.path;
                        }
                    }
                });

                if (firstErrorPath) {
                    const input = document.querySelector(`[name="${firstErrorPath}"]`);
                    if (input) {
                        (input as HTMLElement).focus();
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

    console.log('form', form);

    return (
        <LayoutForm>
            <form onSubmit={handleSubmit} className="inline-flex justify-center flex-col gap-2 md:gap-4 px-10 md:px-12 mt-12 md:mt-10 w-full">
                <div className="form-item relative">
                    <label className="font-medium">Email<span className="text-red-500">*</span></label>
                    <div className="mt-2 ">
                        <input
                            className={`${errors.email && '!border !border-red-500'} input pr-10 rounded-lg focus:ring-0`}
                            type="text"
                            autoComplete={'email'}
                            autoFocus
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>
                    {
                        errors.email && <span className="error">{errors.email}</span>
                    }
                </div>
                <div className="form-item relative">
                    <label className="font-medium">Full Name<span className="text-red-500">*</span></label>
                    <div className="mt-2 ">
                        <input
                            className={`${errors.fullName && '!border !border-red-500'} input pr-10 rounded-lg focus:ring-0`}
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            onChange={handleChange}
                        />
                    </div>
                    {
                        errors.fullName && <span className="error">{errors.fullName}</span>
                    }
                </div>
                <div className="form-item relative">
                    <label className="font-medium">Password<span className="text-red-500">*</span></label>
                    <div className="mt-2 relative w-full">
                        <input
                            className={`${errors.password && '!border !border-red-500'} input pr-10 rounded-lg focus:ring-0`}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
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
                <div className="form-item relative">
                    <label className="font-medium">Confirm Password<span className="text-red-500">*</span></label>
                    <div className="mt-2 relative w-full">
                        <input
                            className={`${errors.confirmPassword && '!border !border-red-500'} input pr-10 rounded-lg focus:ring-0`}
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Enter your confirm password"
                            onChange={handleChange}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <span className="cursor-pointer text-xl text-gray-2 text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                            </span>
                        </div>
                    </div>
                    {
                        errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>
                    }
                </div>
                <Button
                    disabled={loading}
                    type="submit"
                    className="bg-primary custom-loading disabled:bg-primary/70 disabled:cursor-wait text-white py-0.5 w-full relative flex items-center justify-center mt-2 md:mt-1"
                >
                    {loading && <AiOutlineLoading className="h-4 w-4 md:h-6 md:w-6 animate-spin mr-2" />} <span className="whitespace-nowrap">Create</span>
                </Button>
                <div className="inline-flex items-center gap-2">
                    <span className="text-sm md:text-base">Already have an account?
                    </span> <Link href="/login" className="w-fit text-primary text-sm md:text-base underline">Login</Link>
                </div>
                <div className="border-or">
                    <p
                        className="mx-2 mb-0 text-center text-gray-500">
                        or register with
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
            </form>
        </LayoutForm>
    )
}