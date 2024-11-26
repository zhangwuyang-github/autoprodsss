import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { EntityResponse } from '@/types/common.type';

const getToken = async (): Promise<string> => {
    // 在服务端不能使用 localStorage，需要改用其他方式存储 token
    // 可以考虑使用环境变量或数据库存储
    try {
        const response = await axios({
            url: 'https://c2.xinheyun.com/api/open/v2/token',
            method: 'post',
            data: {
                body: {
                    appKey: '5159d3c8-8d45-47a0-9bd6-f560b60d2842',
                    appSecret: 'D>T2&r.Q0Gq]pv]]',
                },
            },
        });
        return response.data.data.accessToken;
    } catch (error) {
        console.error('Error getting token:', error);
        throw error;
    }
};

// Handle GET requests
export async function GET(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the request body
        const token = await getToken();

        const response = await axios.get(`https://c2.xinheyun.com${body.url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error in GET:', error);
        return NextResponse.json(
            { error: 'Error fetching data' }, 
            { status: error.response?.status || 500 }
        );
    }
}

// Handle POST requests
export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); // Parse the request body
        const token = await getToken();

        const response = await axios.post(
            `https://c2.xinheyun.com${body.url}`, 
            body.body, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Error in POST:', error);
        return NextResponse.json(
            { error: 'Error posting data' }, 
            { status: error.response?.status || 500 }
        );
    }
}
