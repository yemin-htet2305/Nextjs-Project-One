"use client";
import Input from "./Input";
import Button from "./Button";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "@/route";


interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string[];
  username?: string[];
  email?: string[];
  password?: string[];
}

export default function AuthenticationForm(
  {type,submitAction}:{type: "register" | "login",submitAction:Function}
) {
const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors | null>(null);
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors(null);
    e.preventDefault();
    const result = await submitAction(formData);
    console.log(result);
    if (result.success) {
        router.push(ROUTES.HOME);
    } else {
      if (result.detail && 'detail' in result) {
        setErrors(result.detail as FormErrors);
      }
      if(result.message === "Email already exists!" && 'message' in result){
        setErrors({email: [result.message]});
      }
      if(result.message === "Username already exists!" && 'message' in result){
        setErrors({username: [result.message]});
      }
      if(result.message === "Password is not matched!" && 'message' in result){
        setErrors({password: [result.message]});
      }
      if(result.message === "User not found!" && 'message' in result){
        setErrors({email: [result.message]});
      }
    }
  };

  return (
    <form
      className="w-2/4 flex flex-col items-center justify-center p-10"
      onSubmit={register}
    >
      <div className=" w-[80%] space-y-8">
        <h3 className="text-xl font-semibold">
          Sign {type === "login"? "In" : "Up"} NextJs <span className="text-main">Coder</span> Forum
        </h3>
        {type == "register" && (
          <>
           <div>
          <Input
            placeholder="Enter your Name"
            label="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <p className="text-red-500">{errors?.name?.[0]}</p>
        </div>
        <div>
          <Input
            placeholder="Enter your UserName"
            label="UserName"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <p className="text-red-500">{errors?.username?.[0]}</p>
        </div>
          </>
        )}
        <div>
          <Input
            placeholder="Enter your email"
            label="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <p className="text-red-500">{errors?.email?.[0]}</p>
        </div>
        <div>
          <Input
            placeholder="Enter your password"
            label="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <p className="text-red-500">{errors?.password?.[0]}</p>
        </div>
        <Button>{type === "register"? "Register Account" : "Sign In"}</Button>
        <AuthForm />
      </div>
    </form>
  );
}
