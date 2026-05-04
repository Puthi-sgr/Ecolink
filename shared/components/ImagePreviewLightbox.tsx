import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { CldAssetKey } from '../utils/cld/cldAssets';
import { getCldFetchUrl } from '../utils/cld/getCldFetchUrl';
import { getCldImage } from '../utils/cld/getCldImage';

export interface ImagePreviewSlide {
  alt: string;
  assetKey?: CldAssetKey;
  src?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

interface ImagePreviewLightboxProps {
  children: React.ReactNode;
  slide?: ImagePreviewSlide;
  slides?: ImagePreviewSlide[];
  initialIndex?: number;
  triggerClassName?: string;
  triggerLabel?: string;
  onIndexChange?: (index: number) => void;
}

export const resolveImagePreviewSlide = (slide: ImagePreviewSlide) => {
  const src = slide.assetKey
    ? getCldImage(slide.assetKey, {
        width: slide.width ?? 1800,
        height: slide.height,
      }).url
    : slide.src
      ? getCldFetchUrl(slide.src, {
          width: slide.width ?? 1800,
          height: slide.height,
        })
      : '';

  return {
    src,
    alt: slide.alt,
    title: slide.title,
    description: slide.description,
    width: slide.width,
    height: slide.height,
  };
};

export const ImagePreviewLightbox: React.FC<ImagePreviewLightboxProps> = ({
  children,
  slide,
  slides,
  initialIndex = 0,
  triggerClassName,
  triggerLabel,
  onIndexChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(initialIndex);
  const sourceSlides = slides ?? (slide ? [slide] : []);
  const normalizedSlides = sourceSlides.map(resolveImagePreviewSlide).filter((item) => item.src);

  const handleOpen = () => {
    setIndex(initialIndex);
    setOpen(true);
  };

  const handleIndexChange = (nextIndex: number) => {
    setIndex(nextIndex);
    onIndexChange?.(nextIndex);
  };

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        aria-label={triggerLabel ?? 'Preview image'}
        onClick={handleOpen}
      >
        {children}
      </button>

      <Lightbox
        open={open && normalizedSlides.length > 0}
        close={() => setOpen(false)}
        index={index}
        slides={normalizedSlides}
        plugins={[Captions, Fullscreen, Thumbnails, Zoom]}
        carousel={{ finite: normalizedSlides.length <= 1 }}
        controller={{ closeOnBackdropClick: true }}
        on={{ view: ({ index: nextIndex }) => handleIndexChange(nextIndex) }}
        zoom={{ maxZoomPixelRatio: 2.5 }}
        thumbnails={{ border: 0, padding: 0, gap: 10 }}
        render={{
          buttonPrev: normalizedSlides.length <= 1 ? () => null : undefined,
          buttonNext: normalizedSlides.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
};
