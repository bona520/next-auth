// "use client";

import { IResponse } from "@/types";
import Navbar from "./components/layout/Navbar";

async function fetchData(token: string) {
  const { signal } = new AbortController();
  const url = 'https://ecrimeapi.gcnpapp.com/api/v1/setting/user';

  const options: any = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'api-key': process.env.NEXT_PUBLIC_API_KEY
    },
    signal
  };

  try {
    const response = await fetch(url, options);
    const jsonData = await response.json();

    return jsonData as IResponse;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}


export default async function Home() {

  const response = await fetchData("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZGY0NzQyNC1mNjllLTRkOWQtOTc3Ny0zY2E0NGM0Mjg1YTciLCJqdGkiOiIyZGU3M2RlZGVlOTEwNWVjMzY3NzRkN2Y0MDQwNjUxOWU2MjVhYThlODNmNjc2NDA1Mjk3NmYxNzlhNTYzMWFhNmNiYTQ5YThmOGY1M2Y3ZCIsImlhdCI6MTc0MDA2NDQyNy41MTg5NTcsIm5iZiI6MTc0MDA2NDQyNy41MTg5NjMsImV4cCI6MTc3MTYwMDQyNy41MDQwOCwic3ViIjoiMSIsInNjb3BlcyI6W119.hg77IzOsFp5s1EboftdUz8rBJ7Ps-A9EsfaF1PusfNGt2ebvJnCFYf2Nb9Br66qffVE6mKaWqhSRSxUS7UX9sk3HiF5WJLrG8bj1JjZDiUJA_jzRS1_7H1ksR5h1mZ1xFs5x_e9Q3W_VNV5PqXnr2UxIODyOpytAIwSpBmkrV7msnOCnUtmT1FimDYRfp0WtMazMBUG0IBZQF7boP3MrfB_cRqsv8LCML9MNb2SCddW0YuE_e3AY_UtCQXmOomZevbmpGIMopGrooeyHo2n56FxaLrMfl3X8d8zQMDiKG2sWNIbnN6J5zhlpbTTahDpDG7LBWL9UylxE8V3CC_X0pQBwPjGEA1N4Q2b-1BRlLbSS5-kI9o8KqngUgItaweJgyt7WBXtBHdma-pVoBIVNq9nbNlSiZVMQh0sN4-FmI51DoL3ecdyKAMq9Mg5rPSNA1oONcHHIzcCQ11dr2j0cZYcWlgvO3pDesLlHP7kNM_33Hmt9lZAgNESeAeCtZ8jJWX9UwhFDsWIjZfJJGJKvwxqq8VUWF9DJ2piUAV7xjLSh5Mrd18qGnRM4AIvquAujJcMN8l3Um-jZSyK4IAWiYXVWWaz0rAR6dCMq6C_U4zFfYvxia3VSTscWgDvdyZKNVYSGPhXIlutEdAvnsyjDtODYPXIagNv9WvBA8FpUhY4");

  console.log({ response });

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 h-[100dvh] flex flex-col items-center justify-center">
        <div className="button text-white p-2 rounded-lg w-40 bg-gray-700"
          // onClick={showData}
        >
          showData
        </div>
      </div>
    </>
  );
}
