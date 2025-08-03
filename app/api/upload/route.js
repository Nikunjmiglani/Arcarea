import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false, // important for form-data
  },
};

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file"); // single image

  if (!file) {
    return NextResponse.json({ error: "No file received" }, { status: 400 });
  }

  const buffer = await streamToBuffer(file.stream());

  const uploadRes = await cloudinary.uploader.upload_stream(
    { folder: "vendors" },
    (error, result) => {
      if (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
      }

      return NextResponse.json({ url: result.secure_url }, { status: 200 });
    }
  );

  Readable.from(buffer).pipe(uploadRes);
}
