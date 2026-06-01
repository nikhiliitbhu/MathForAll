/**
 * NCERT Mathematics Textbook URLs
 *
 * PDFs are served from /public/books/ (local, fast, no CORS issues).
 * Download script: run `bash download-ncert.sh` in project root.
 *
 * ncertUrl = direct NCERT link shown as fallback "Open on NCERT" button.
 */

const LOCAL = "/books";
const NCERT = "https://ncert.nic.in/textbook/pdf";

export const ncertBooks = {
  "class-6": {
    en: {
      url: `${LOCAL}/fegp1ps.pdf`,
      ncertUrl: `${NCERT}/fegp1ps.pdf`,
      title: "Ganita Prakash – Class 6 Maths (English)",
      pages: 194,
    },
    hi: {
      url: `${LOCAL}/fhgp1ps.pdf`,
      ncertUrl: `${NCERT}/fhgp1ps.pdf`,
      title: "गणित प्रकाश – कक्षा 6 (हिंदी माध्यम)",
      pages: 194,
    },
  },
  "class-7": {
    en: {
      url: `${LOCAL}/gegp1ps.pdf`,
      ncertUrl: `${NCERT}/gegp1ps.pdf`,
      title: "Ganita Prakash – Class 7 Maths (English)",
      pages: 200,
    },
    hi: {
      url: `${LOCAL}/ghgp1ps.pdf`,
      ncertUrl: `${NCERT}/ghgp1ps.pdf`,
      title: "गणित प्रकाश – कक्षा 7 (हिंदी माध्यम)",
      pages: 200,
    },
  },
  "class-8": {
    en: {
      url: `${LOCAL}/hegp1ps.pdf`,
      ncertUrl: `${NCERT}/hegp1ps.pdf`,
      title: "Ganita Prakash – Class 8 Maths (English)",
      pages: 194,
    },
    hi: {
      url: `${LOCAL}/hhgp1ps.pdf`,
      ncertUrl: `${NCERT}/hhgp1ps.pdf`,
      title: "गणित प्रकाश – कक्षा 8 (हिंदी माध्यम)",
      pages: 194,
    },
  },
  "class-9": {
    en: {
      url: `${LOCAL}/iemh1ps.pdf`,
      ncertUrl: `${NCERT}/iemh1ps.pdf`,
      title: "Mathematics – Class 9 (English)",
      pages: 254,
    },
    hi: {
      url: `${LOCAL}/ihmh1ps.pdf`,
      ncertUrl: `${NCERT}/ihmh1ps.pdf`,
      title: "गणित – कक्षा 9 (हिंदी माध्यम)",
      pages: 254,
    },
  },
  "class-10": {
    en: {
      url: `${LOCAL}/jemh1ps.pdf`,
      ncertUrl: `${NCERT}/jemh1ps.pdf`,
      title: "Mathematics – Class 10 (English)",
      pages: 270,
    },
    hi: {
      url: `${LOCAL}/jhmh1ps.pdf`,
      ncertUrl: `${NCERT}/jhmh1ps.pdf`,
      title: "गणित – कक्षा 10 (हिंदी माध्यम)",
      pages: 270,
    },
  },
  "class-11": {
    en: {
      url: `${LOCAL}/kemh1ps.pdf`,
      ncertUrl: `${NCERT}/kemh1ps.pdf`,
      title: "Mathematics – Class 11 (English)",
      pages: 363,
    },
    hi: {
      url: `${LOCAL}/kham1ps.pdf`,
      ncertUrl: `${NCERT}/kham1ps.pdf`,
      title: "गणित – कक्षा 11 (हिंदी माध्यम)",
      pages: 363,
    },
  },
  "class-12": {
    en: {
      url: `${LOCAL}/lemh1ps.pdf`,
      ncertUrl: `${NCERT}/lemh1ps.pdf`,
      title: "Mathematics Part 1 – Class 12 (English)",
      pages: 290,
    },
    hi: {
      url: `${LOCAL}/lhmh1ps.pdf`,
      ncertUrl: `${NCERT}/lhmh1ps.pdf`,
      title: "गणित भाग 1 – कक्षा 12 (हिंदी माध्यम)",
      pages: 290,
    },
  },
};