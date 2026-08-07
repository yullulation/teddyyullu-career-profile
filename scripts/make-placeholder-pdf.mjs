/**
 * Writes a minimal, valid one-page PDF so the "Download Portfolio" buttons
 * resolve instead of 404-ing. Replace public/documents/professional-portfolio.pdf
 * with the real compiled document (CV + certificates + recommendations).
 */
import fs from "fs";

const lines = [
  ["/F1 22 Tf", "72 720 Td", "(TEDDY YULLU) Tj"],
  ["/F1 12 Tf", "0 -26 Td", "(Urban & Regional Planner  |  Graphic Designer) Tj"],
  ["/F1 11 Tf", "0 -46 Td", "(Professional Portfolio - document pending compilation) Tj"],
  ["/F1 10 Tf", "0 -30 Td", "(This combined document will contain:) Tj"],
  ["/F1 10 Tf", "0 -20 Td", "(   -  Curriculum Vitae) Tj"],
  ["/F1 10 Tf", "0 -16 Td", "(   -  Academic certificates and transcripts) Tj"],
  ["/F1 10 Tf", "0 -16 Td", "(   -  Professional certifications) Tj"],
  ["/F1 10 Tf", "0 -16 Td", "(   -  Recommendation letters) Tj"],
  ["/F1 10 Tf", "0 -34 Td", "(In the meantime, the full career profile is available online.) Tj"],
  ["/F1 10 Tf", "0 -16 Td", "(Contact: yullulation@gmail.com  |  +254 799 467 088) Tj"],
];

const content = `BT\n${lines.map((l) => l.join("\n")).join("\n")}\nET\n`;

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${content.length} >>\nstream\n${content}endstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefPos = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
offsets.forEach((o) => {
  pdf += `${String(o).padStart(10, "0")} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

fs.mkdirSync("public/documents", { recursive: true });
fs.writeFileSync("public/documents/professional-portfolio.pdf", pdf, "latin1");
console.log("wrote placeholder:", pdf.length, "bytes");
