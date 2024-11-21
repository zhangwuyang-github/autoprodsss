import axios, { AxiosRequestConfig } from "axios";
import env from "@/envConfig";
import { redirect } from "next/navigation";

export default async function request(body: AxiosRequestConfig) {
  try {
    const resp = await axios({
      ...body,
      url: `${env.proxy}${body.url}`,
      headers: {
        Referer: 'https://c2.xinheyun.com',
      },
    });

    if (resp?.data?.code === 401) {
      if (typeof window === "undefined") {
        redirect("/login");
      } else {
        window.location.href = "/login";
      }
    }

    return resp.data;
  } catch (e: any) {
    return { code: 500, message: e.message || e.response?.message || `${e}` };
  }
}
