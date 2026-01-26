export type CldAssetKey =
  | "hero.main"
  | "package.placeholder"
  | "about.snapshot"
  | "about.community.avatar"
  | "about.community.image"
  | "about.conservation.image"
  | "cbet.package.veunsaisiampang.hero"
  | "cbet.package.veunsaisiampang.community.story"
  | "cbet.package.veunsaisiampang.community.profile"
  | "cbet.package.veunsaisiampang.snapshot"
  | "cbet.package.veunsaisiampang.significance";


export const cldAssets: Record<CldAssetKey, { publicId: string; alt: string }> = {
  "hero.main": { publicId: "KPC00060_tvl6ah", alt: "Hero main image" },
  "package.placeholder": { publicId: "string", alt: "CBET package placeholder" },
  "about.snapshot": { publicId: "string", alt: "CBET snapshot" },
  "about.community.avatar": { publicId: "string", alt: "Community lead" },
  "about.community.image": { publicId: "string", alt: "Community fieldwork" },
  "about.conservation.image": { publicId: "string", alt: "Conservation wildlife" },
  "cbet.package.veunsaisiampang.hero": { publicId: "IMG_1915_wpizkj", alt: "Veun Sai-Siem Pang CBET Package Hero Image" },
  "cbet.package.veunsaisiampang.community.story": { publicId: 'IMG_6793_yaclpl', alt: "Veun Sai-Siem Pang Community Story Image" },
  "cbet.package.veunsaisiampang.community.profile": { publicId: 'DSC09220_qw3tbw', alt: "Veun Sai-Siem Pang Community Profile Image" },
  "cbet.package.veunsaisiampang.snapshot": { publicId: "DSC09174_tyakc2", alt: "Veun Sai-Siem Pang Hero Snapshot Image" },
  "cbet.package.veunsaisiampang.significance": { publicId: "IMG_1915_wpizkj", alt: "Veun Sai-Siem Pang Conservation Significance Image" }
};
