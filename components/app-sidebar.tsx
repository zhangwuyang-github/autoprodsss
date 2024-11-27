'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import Image from "next/image";
import { fetchMenuList } from "./service";
import { useRequest } from "ahooks";

export const AppSideBar = () => {
  const menu = useRequest(
    fetchMenuList,
    { manual: false },
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
        <SidebarTrigger className="absolute right-2" />
          <SidebarGroupLabel className="flex justify-center border-b mb-4 h-12">
            <Image
              width={28}
              height={28}
              alt="logo"
              src="https://img.xinheyun.com/c4b62870-3cde-47f2-830f-a5f07801790b_7bb6b749f5132b58695093a4b7936654"
            />
            新新人类
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.data?.data?.data?.list?.map((v) => {
                const baseUrl = v.baseUrl?.split('/');
                let u = '/login';
                if (baseUrl?.length) {
                  u = `/${baseUrl[baseUrl?.length - 1]}`;
                }
                const defaultLogoSrc = "https://img.xinheyun.com/c4b62870-3cde-47f2-830f-a5f07801790b_7bb6b749f5132b58695093a4b7936654";
                return (
                  <SidebarMenuItem key={v.id}>
                  <SidebarMenuButton asChild>
                    <a href={u}>
                      <Image src={v.logo.startsWith('http') ? v.logo : defaultLogoSrc} width={20} height={20} alt="" />
                      <span>{v.templateName}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
