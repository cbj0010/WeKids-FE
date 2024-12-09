import { signOut } from "@/auth";
import CustomButton from "../atoms/CustomButton";

export const SignOut = async ({ children }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      {children}
    </form>
  );
};
