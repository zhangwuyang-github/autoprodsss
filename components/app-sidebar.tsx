'use client'
import { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";

export const AppSideBar = () => {
  // useRequest(
  //   () =>
  //     fetch('/api/request', {
  //       method: "post",
  //       body: JSON.stringify({
  //         body: {
  //           body: { platformEnum: "WEB" },
  //         },
  //         url: "/api/operation/c2/navigation/c2/menu/show",
  //         method: 'post',
  //       }),
  //     }),
  //   {
  //     manual: false,
  //     onSuccess: resp => {
  //       console.log(resp);
  //     }
  //   }
  // );

  const menu: {
    key: string;
    name: string;
    disabled?: boolean;
    icon?: ReactNode;
  }[] = [
    {
      key: "home",
      name: "主页",
    },
    {
      key: "work-order-list",
      name: "生产单",
      disabled: true,
    },
    {
      key: "order-list",
      name: "订单",
    },
    {
      key: "pre-list",
      name: "预测单",
      disabled: true,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center border-b mb-4">
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
              {menu.map((v) => (
                <SidebarMenuItem key={v.key}>
                  <SidebarMenuButton asChild>
                    <a href={v.key}>
                      <span>{v.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
