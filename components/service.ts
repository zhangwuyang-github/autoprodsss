import { ListResponse } from "@/types/common.type";
import axios, { AxiosResponse } from "axios";

export const fetchMenuList = (): Promise<AxiosResponse<ListResponse<{
    id: number;
    baseUrl: string;
    templateName: string;
    logo: string;
}>>> => axios({
    url: '/api/proxy',
    method: 'post',
    data: {
        url: '/api/operation/c2/navigation/c2/menu/show',
        body: {
            body: {
                platformEnum: 'WEB',
            },
        },
    },
});
