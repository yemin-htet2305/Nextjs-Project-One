import logo from "../../../public/logo.png";
import Image from "next/image";
import Button from "../../../Components/Button";
import Link from "next/link";
import AuthenticationForm from "@/Components/AuthenticationForm";
import { signInWithCredentials } from "@/lib/action/signInWithCredentials.action";
import ROUTES from "@/route";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (session) redirect(ROUTES.HOME);
  return (
    <div className="flex">
      <div className="w-2/4 p-10 bg-primary h-screen space-y-10 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-4">
          <Image src={logo} alt="logo" width={100} height={100} />
          <h1 className="text-5xl font-semibold">
            Next <span className="text-main">Coder</span> Forum
          </h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          perferendis magnam, cupiditate velit rem nisi quos aliquam temporibus
          impedit vitae veritatis. Est ullam at quidem nostrum vero odit ipsa
          dolores!
        </p>
        <Link href={ROUTES.REGISTER}>
          <Button>Register an Account?</Button>
        </Link>
      </div>
      <AuthenticationForm type="login" submitAction={signInWithCredentials}/>
    </div>
  );
}
