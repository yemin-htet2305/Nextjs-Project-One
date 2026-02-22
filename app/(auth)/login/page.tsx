import Input from "@/Components/Input";
import logo from "@/public/logo.png";
import Image from "next/image";
import google from "@/public/google.webp";
import github from "@/public/github.png";
function page() {
  return (
    <>
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
            perferendis magnam, cupiditate velit rem nisi quos aliquam
            temporibus impedit vitae veritatis. Est ullam at quidem nostrum vero
            odit ipsa dolores!
          </p>
          <button className="px-2 py-2 rounded-lg border-2 border-main w-full">
            Create a New Account
          </button>
        </div>
        <div className="w-2/4 flex flex-col items-center justify-center p-10">
          <div className=" w-[80%] space-y-8">
            <h3 className="text-xl font-semibold">
              Sign Into NextJs <span className="text-main">Coder</span> Forum
            </h3>
            <div>
              <Input placeholder="Enter your email" label="Email" />
            </div>
            <div>
              <Input placeholder="Enter your password" label="Password" />
            </div>
            <button className="px-2 py-2 rounded-lg border-2 border-main w-full bg-main mt-3">
              Sign In
            </button>
            <div className="flex space-x-3">
              <button className="border-2 border-main px-2 py-2 rounded-lg w-full flex justify-center">
                <Image
                  src={google}
                  alt="google"
                  width={30}
                  height={30}
                  className="rounded-full mx-2"
                />
                Sign In With Google
              </button>
              <button className="border-2 border-main px-2 py-2 rounded-lg w-full flex justify-center">
                <Image
                  src={github}
                  alt="github"
                  width={30}
                  height={30}
                  className="rounded-full mx-2"
                />
                Sign In With Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
