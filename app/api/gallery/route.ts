import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/lib/api/axios';

export async function GET() {
    try {
        const response = await axiosInstance.get('api/gallery');
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Gallery GET error:', error.message);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch gallery' },
            { status: error.response?.status || 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const cookieHeader = req.headers.get('cookie');

        // Create new FormData to forward to backend
        const backendFormData = new FormData();
        
        // Copy all fields from request FormData
        for (const [key, value] of formData.entries()) {
            backendFormData.append(key, value);
        }

        console.log('Forwarding to backend:', {
            hasTitle: formData.has('title'),
            hasImage: formData.has('image'),
            hasCategory: formData.has('category'),
            imageSize: (formData.get('image') as File)?.size,
        });

        // Forward to backend API with proper headers
        const response = await axiosInstance.post('api/gallery', backendFormData, {
            headers: {
                'Cookie': cookieHeader || '',
                // Let axios/browser set the Content-Type with boundary
            },
        });

        console.log('Backend response:', response.data);
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Gallery POST error:', error.message, error.response?.data);
        return NextResponse.json(
            { success: false, message: error.response?.data?.message || error.message || 'Failed to upload gallery' },
            { status: error.response?.status || 500 }
        );
    }
}
