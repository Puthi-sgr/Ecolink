import { cld } from "./cld";
import { cldAssets, CldAssetKey } from "./cldAssets";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto as formatAuto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as qualityAuto } from "@cloudinary/url-gen/qualifiers/quality";
import { CloudinaryImage } from "@cloudinary/url-gen";

type GetCldImageOptions = {
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
};

export const getCldImage = (key: CldAssetKey, opts: GetCldImageOptions = {}) => {
  const asset = cldAssets[key];
  if (!asset) {
    throw new Error(`Unknown Cloudinary asset key: ${key}`);
  }

  const image: CloudinaryImage = cld.image(asset.publicId);

  if (opts.width != null || opts.height != null) {
    const resize = scale();
    if (opts.width != null) resize.width(opts.width);
    if (opts.height != null) resize.height(opts.height);
    image.resize(resize);
  }

  if (opts.autoFormat !== false) {
    image.delivery(format(formatAuto()));
  }

  if (opts.autoQuality !== false) {
    image.delivery(quality(qualityAuto()));
  }

  return {
    image,
    url: image.toURL(),
    alt: asset.alt,
  };
};
