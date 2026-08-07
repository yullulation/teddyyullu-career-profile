import sharp from "sharp";
import path from "path";
import fs from "fs";

const SRC = "C:/Users/gerald/Desktop/yullulation";
const OUT = "C:/Users/gerald/Desktop/yullulation-web/public/images";

const jobs = [
  {
    src: `${SRC}/ChatGPT Image Jul 30, 2026, 01_42_10 PM.png`,
    out: `${OUT}/hero/hero-scene.jpg`,
    width: 2600,
    format: "jpeg",
    quality: 84,
  },
  {
    src: `${SRC}/ChatGPT Image Jul 28, 2026, 03_07_37 PM.png`,
    out: `${OUT}/hero/portrait.jpg`,
    width: 1400,
    format: "jpeg",
    quality: 88,
  },
  {
    src: `${SRC}/Posters/1.png`,
    out: `${OUT}/work/babus-delicacies.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/Book Mockups - 8.png`,
    out: `${OUT}/work/eat-to-be-exceptional.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/urban(1).png`,
    out: `${OUT}/work/urban-drift.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/Malkias Summit 2025(9).png`,
    out: `${OUT}/work/malkias-summit.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/graphiskool Logo(4).png`,
    out: `${OUT}/work/graphiskool.webp`,
    width: 1400,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/annatoria(4).png`,
    out: `${OUT}/work/annatoria.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/Add a subheading(1).png`,
    out: `${OUT}/work/gt3rs.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/Black Yellow Business Flyer.png`,
    out: `${OUT}/work/power-secret-place.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/Copy of Delicious Food Menu (Instagram Story)(3).png`,
    out: `${OUT}/work/bbq-corner.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/nywele(12).png`,
    out: `${OUT}/work/nywele-na-notes.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/3.jpg`,
    out: `${OUT}/work/yullulation-web-concept.webp`,
    width: 1800,
    format: "webp",
    quality: 82,
  },
  {
    src: `${SRC}/Posters/Black Modern Minimalist Size Chart Instagram Post.png`,
    out: `${OUT}/work/bird-brand-concept.webp`,
    width: 1600,
    format: "webp",
    quality: 82,
  },
];

for (const job of jobs) {
  fs.mkdirSync(path.dirname(job.out), { recursive: true });
  const pipeline = sharp(job.src).resize({ width: job.width, withoutEnlargement: true });
  const withFormat =
    job.format === "jpeg"
      ? pipeline.jpeg({ quality: job.quality, mozjpeg: true })
      : pipeline.webp({ quality: job.quality });
  await withFormat.toFile(job.out);
  const stat = fs.statSync(job.out);
  console.log(`${path.basename(job.out)} -> ${(stat.size / 1024).toFixed(0)} KB`);
}
