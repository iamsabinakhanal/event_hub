import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/lib/api/axios';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const response = await axiosInstance.get(`api/gallery/${id}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Gallery GET error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch gallery item' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const cookieHeader = req.headers.get('cookie');

        const response = await axiosInstance.delete(`api/gallery/${id}`, {
            headers: {
                'Cookie': cookieHeader || '',
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Gallery DELETE error:', error);
        return NextResponse.json(
            { success: false, message: error.response?.data?.message || error.message || 'Failed to delete gallery item' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const formData = await req.formData();
        const cookieHeader = req.headers.get('cookie');

        const response = await axiosInstance.put(`api/gallery/${id}`, formData, {
            headers: {
                'Cookie': cookieHeader || '',
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Gallery PUT error:', error);
        return NextResponse.json(
            { success: false, message: error.response?.data?.message || error.message || 'Failed to update gallery item' },
            { status: error.response?.status || 500 }
        );
    }
}
