"use client";
import { useRequest } from "ahooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "最少2位",
    })
    .max(16, {
      message: "最大16位",
    }),
  password: z
    .string()
    .min(2, {
      message: "最少2位",
    })
    .max(16, {
      message: "最大16位",
    }),
});

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const f = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { run, loading } = useRequest(
    async (param: { username: string; password: string }) => {
      // const resp = await request({
      //   url: "/api-domain/user-center/authority/authority/v1/login",
      //   method: "post",
      //   data: {
      //     body: {
      //       account: param.username,
      //       password: param.password,
      //       isForce: 1,
      //     }
      //   },
      // })
      // return resp;
      await new Promise((resolve) => {
        setTimeout(() => resolve(true), 800);
      });
      return { code: 200, message: 'success', data: param };
    },
    {
      manual: true,
      onSuccess: (resp) => {
        console.log(resp);
        if (resp?.code === 200) {
            toast({
                description: '登录成功',
                variant: 'default',
            });
            router.push('/home');
        }
      },
    }
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-muted w-1/4 p-6 rounded-md">
        <FormProvider {...f}>
          <form onSubmit={f.handleSubmit(run)} className="space-y-8">
            <FormField
              control={f.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={f.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="请输入" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="animate-spin" />}
              登录
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginForm;
