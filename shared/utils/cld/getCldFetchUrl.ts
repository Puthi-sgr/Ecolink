type GetCldFetchOptions = {
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

export const getCldFetchUrl = (src: string, opts: GetCldFetchOptions = {}) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName || !src) {
    return src;
  }

  if (!/^https?:\/\//i.test(src)) {
    return src;
  }

  if (src.includes("res.cloudinary.com")) {
    return src;
  }

  const transforms: string[] = [];
  if (opts.width != null || opts.height != null) {
    transforms.push("c_scale");
    if (opts.width != null) transforms.push(`w_${opts.width}`);
    if (opts.height != null) transforms.push(`h_${opts.height}`);
  }

  if (opts.autoFormat !== false) {
    transforms.push("f_auto");
  }

  if (opts.autoQuality !== false) {
    transforms.push("q_auto");
  }

  const transformString = transforms.length ? `${transforms.join(",")}/` : "";
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transformString}${encodeURIComponent(
    src,
  )}`;
};
