import wyzeCamV4 from "@/assets/products/wyze-cam-v4.png";
import wyzeCamPanV3 from "@/assets/products/wyze-cam-pan-v3.png";
import wyzeCamFloodlightV2 from "@/assets/products/wyze-cam-floodlight-v2.png";
import wyzeDuoCamDoorbell from "@/assets/products/wyze-duo-cam-doorbell.png";
import wyzeBatteryCamPro from "@/assets/products/wyze-battery-cam-pro.png";
import camUnlimited from "@/assets/products/cam-unlimited.svg";
import wyzeSenseMotionSensor from "@/assets/products/wyze-sense-motion-sensor.png";
import wyzeMicrosd256gb from "@/assets/products/wyze-microsd-256gb.png";

export const productImageUrls: Record<string, string> = {
  "wyze-cam-v4": wyzeCamV4,
  "wyze-cam-pan-v3": wyzeCamPanV3,
  "wyze-cam-floodlight-v2": wyzeCamFloodlightV2,
  "wyze-duo-cam-doorbell": wyzeDuoCamDoorbell,
  "wyze-battery-cam-pro": wyzeBatteryCamPro,
  "cam-unlimited": camUnlimited,
  "wyze-sense-motion-sensor": wyzeSenseMotionSensor,
  "wyze-sense-hub": wyzeCamFloodlightV2,
  "wyze-microsd-256gb": wyzeMicrosd256gb,
};

export function resolveProductImageUrl(
  productId: string,
  fallback: string,
): string {
  return productImageUrls[productId] ?? fallback;
}
