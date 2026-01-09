import { db } from "@/config/db";
import { storage } from "@/config/firebaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq, userEmail } =
    await req.json();

  try {
    // Try converting image to Base64 first
    let inputImage;
    try {
      inputImage = await ConvertImageToBase64(imageUrl);
    } catch (err) {
      console.warn("⚠️ Base64 conversion failed, falling back to raw URL");
      inputImage = imageUrl;
    }

    // Build replicate input
    const input = {
      image: inputImage,
      prompt: `A ${roomType} with a ${designType} style interior ${additionalReq || ""}`,
    };

    // Run replicate model
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    // Replicate returns array of URLs sometimes
    const resultUrl = Array.isArray(output) ? output[0] : output;
    if (!resultUrl) {
      throw new Error("No output URL from Replicate");
    }

    // Convert final output to Base64 (so we can save permanently)
    const base64Image = await ConvertImageToBase64(resultUrl);

    // Save AI image to Firebase
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, "room-redesign/" + fileName);
    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);
    console.log("✅ Uploaded AI image to Firebase:", downloadUrl);

    // Save details in DB
    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType: roomType,
        designType: designType,
        orgImage: imageUrl,
        aiImage: downloadUrl,
        userEmail: userEmail,
      })
      .returning({ id: AiGeneratedImage.id });

    console.log("✅ Saved in DB:", dbResult);

    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    console.error("❌ Replicate full error:", e);
    return NextResponse.json({ error: e.message || e.toString() });
  }
}

// Utility: convert image URL → Base64
async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}
