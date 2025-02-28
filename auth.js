import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { decrypt } from "@/src/libs/session";
import { cookies } from "next/headers";
import { BASE_URL } from "./src/constants/url";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    error: "/error",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const cookieStore = await cookies();

        if (credentials.token) {
          const session = await decrypt(credentials.token);

          const user = {
            id: session?.memberId,
            role: session?.role,
            Authorization: credentials.token,
          };

          return user;
        }

        cookieStore.delete("email");
        cookieStore.delete("name");
        cookieStore.delete("birthday");

        let body;

        console.log(credentials);

        if (credentials.memberType === "PARENT") {
          body = {
            birthday: credentials.birthday,
            name: credentials.name,
            phone: credentials.phone,
            simplePassword: credentials.simplePassword,
            email: credentials.email,
            social: credentials.social,
            memberType: credentials.memberType,
          };
        } else if (credentials.memberType === "CHILD") {
          body = {
            birthday: credentials.birthday,
            name: credentials.name,
            phone: credentials.phone,
            email: credentials.email,
            social: credentials.social,
            memberType: credentials.memberType,
            guardianName: credentials.guardianName,
            guardianBirthday: credentials.guardianBirthday,
            guardianPhone: credentials.guardianPhone,
          };
        }

        const response = await fetch(BASE_URL + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          if (response.status === 409) console.error("이미 가입한 회원입니다.");
          else console.error("failed to fetch:", response);
          return null;
        }

        try {
          const data = await response.json();

          if (data.token) {
            const session = await decrypt(data.token);

            const user = {
              id: session?.memberId,
              role: session?.role,
              Authorization: data.token,
            };

            return user;
          }
        } catch (error) {
          console.error("JSON parsing error", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.Authorization = user.Authorization;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        Authorization: token.Authorization,
      };

      return session;
    },
    async authorized({ auth }) {
      if (!auth) {
        const cookie = await cookies();
        const authorization = cookie.get("Authorization")?.value;
        if (authorization) {
          return signIn("credentials", {
            token: authorization,
            redirect: false,
          });
        }
      }
      return !!auth;
    },
  },
});
