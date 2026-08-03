import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";

export async function POST() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json(
            { error: "Cloudinary is not configured on the server." },
            { status: 500 }
        );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "avatars";

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder,
        },
        apiSecret
    );

    return NextResponse.json({
        cloudName,
        apiKey,
        signature,
        timestamp: String(timestamp),
        folder,
    });
}
