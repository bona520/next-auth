/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
export interface UnknownObjType<T = any> {
    [key: string]: T
}

export type TRoot = Readonly<{
    children: ReactNode;
}>

export type TDataLogin = {
	id: number,
	role: string,
	token: string,
	userName: string,
	roleId:number
}

export interface IResponse<T = any> {
	data: {
		data: T[];
	} | null | any;
	code?: number;
	statusCode?: number;
	success?: boolean;
	status?: number;
	limit: number;
	pages: number;
	page?: number;
	totalPages: number;
	isArray: boolean;
	path: string;
	duration: string;
	method: string;
	pagination: {
		limit: number;
		pages: number;
		page: number;
		totalPages: number;
	}
}

export type Errors = {
    [key: string]: string
}

export type TResponseLogin = {
    status: number,
    code?: number,
    data: TDataLogin
    message?: string
    error?: string
}

export type LANG_TYPE = 'en' | 'km' | 'zh'

export type TBusinessesTypes ={
    _id : string;
    name: string;
    sort: number;
    status: false;
    image: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TypeAttributes {
    type Size = 'lg' | 'md' | 'sm' | 'xs'
    type Shape = 'round' | 'circle' | 'none'
    type Status = 'success' | 'warning' | 'danger' | 'info'
    type FormLayout = 'horizontal' | 'vertical' | 'inline'
    type ControlSize = 'lg' | 'md' | 'sm' | 'xs'
    type MenuVariant = 'light' | 'dark' | 'themed' | 'transparent'
    type Direction = 'ltr' | 'rtl'
}
