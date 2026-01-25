import React from "react";
import { CldAssetKey } from "../utils/cld/cldAssets";
import { getCldImage } from "../utils/cld/getCldImage";
import { getCldFetchUrl } from "../utils/cld/getCldFetchUrl";

type CldImageProps = {
  alt: string;
  assetKey?: CldAssetKey;
  src?: string;
  width?: number;
  height?: number;
  /**
   * Defaults to auto; set to false to skip.
   */
  autoFormat?: boolean;
  /**
   * Defaults to auto; set to false to skip.
   */
  autoQuality?: boolean;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height">;

export const CldImage: React.FC<CldImageProps> = ({
  alt,
  assetKey,
  src,
  width,
  height,
  autoFormat,
  autoQuality,
  ...props
}) => {
  let resolvedSrc = "";
  if (assetKey) {
    resolvedSrc = getCldImage(assetKey, {
      width,
      height,
      autoFormat,
      autoQuality,
    }).url;
  } else if (src) {
    resolvedSrc = getCldFetchUrl(src, {
      width,
      height,
      autoFormat,
      autoQuality,
    });
  }

  if (!resolvedSrc) {
    return null;
  }

  return (
    <img src={resolvedSrc} alt={alt} width={width} height={height} {...props} />
  );
};
