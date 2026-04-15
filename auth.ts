import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { api } from "./lib/api";
import SignInSchema from "./lib/schemas/SignInSchema";
import signinValidateBody from "./lib/signinValidateBody";
import bcrypt from "bcryptjs";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,Google,Credentials({
    async authorize(credentials){
      const validateFields = signinValidateBody(credentials, SignInSchema);
      if(validateFields.success){
        const { email, password } = validateFields.data;
        const {data: existingAccount} = await api.accounts.getByProviderAccountId(email);
        if(!existingAccount) return null;
        const {data: existingUser} = await api.users.getById(existingAccount.userId.toString());
        if(!existingUser) return null;

        const isPasswordValid = await bcrypt.compare(password, existingAccount.password);
        if(isPasswordValid){
          return {
            id: existingUser.id,
            name: existingUser.name,
            username: existingUser.username,
            email: existingUser.email,
            image: existingUser.image,
          }
        }
        
      }
      return null;
    }
  })],
  callbacks:{
    async signIn({user,account,profile}){
      if(account?.type === "credentials") return true;
      if(!user || !account ) return false;

      const {success} = await api.auth.oauthSignIn({
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        user: {
          name: user.name || "",
          email: user.email || "",
          image: user.image || "",
          username: account.provider === "github" ? profile?.login as string : user?.name as string
        }
      });
      return success;
    },
    async jwt({token,account}){
            if(account){
             const {success,accountData} = await api.accounts.getByProviderAccountId(account?.providerAccountId);
             if(!success || !accountData) return token;
             const userId = account?.userId;
             if (userId) token.sub = userId;
      }
      return token;
    },
    async session({session,token}){
      session.user.id = token.sub as string;
      return session;
    }

  }
})