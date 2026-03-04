import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/lib/api/axios';

export async function GET(
    req: NextRequest,
    { params }: { params: { category: string } }
) {
    try {
        const { category } = params;
        const response = await axiosInstance.get(`api/gallery/category/${encodeURIComponent(category)}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Gallery category GET error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch gallery by category' },
            { status: error.response?.status || 500 }
        );
    }
}
