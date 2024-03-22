import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLogin = async () => {
    const values = form.getValues();
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: values.email,
        password: values.password,
      }
    );

    if (signInError) {
      return;
    }

    if (!signInError && data && data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      router.replace("/dashboard");
    }
  };

  const handleSignup = async () => {
    const values = form.getValues();
    const { data, error: signInError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (signInError) {
      return;
    }

    if (!signInError && data && data.session) {
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      router.replace("/dashboard");
    }
  };

  return (
    <div>
      <h2>Login/Register</h2>
      <label>Email</label>
      <input type="email" {...form.register("email")} />
      <label>Password</label>
      <input type="password" {...form.register("password")} />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <button type="button" onClick={handleSignup}>
        Sign up
      </button>
    </div>
  );
}
