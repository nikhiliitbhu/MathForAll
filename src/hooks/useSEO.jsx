import { useMemo } from "react";

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  type = "website",
}) => {
  const seoData = useMemo(() => {
    const baseUrl = "https://mathrix.vercel.app";
    
    return {
      title: title ? `${title} | Mathrix` : "Mathrix - Complete Maths Guide for Class 6-12",
      description: description || "Master Mathematics with Mathrix - Your complete free learning platform for Class 6-12. Chapter-wise NCERT solutions, 300+ formulas, interactive 3D shapes, practice quizzes.",
      keywords: keywords || "maths, mathematics, class 6, class 7, class 8, class 9, class 10, class 11, class 12, NCERT, formulas, quizzes, 3D shapes, geometry, algebra, trigonometry, calculus, free learning, India, Maths Lab",
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
      ogTitle: ogTitle || title || "Mathrix - Complete Maths Guide for Class 6-12",
      ogDescription: ogDescription || description || "Master Mathematics with Mathrix - Chapter-wise NCERT solutions, 300+ formulas, interactive 3D shapes, practice quizzes.",
      ogImage: ogImage || `${baseUrl}/logo.png`,
      ogType: type,
      twitterTitle: twitterTitle || title || "Mathrix - Complete Maths Guide for Class 6-12",
      twitterDescription: twitterDescription || description || "Master Mathematics with Mathrix - Chapter-wise NCERT solutions, 300+ formulas, interactive 3D shapes, practice quizzes.",
      twitterImage: twitterImage || `${baseUrl}/logo.png`,
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage, type]);

  return seoData;
};

export const pageSEO = {
  home: {
    title: "Mathrix - Complete Maths Guide for Class 6-12",
    description: "Master Mathematics with Mathrix - Your complete free learning platform for Class 6-12. Chapter-wise NCERT solutions, 300+ formulas, interactive 3D shapes, practice quizzes. No login required.",
    canonical: "/",
    type: "website",
  },
  learn: {
    title: "Learn Mathematics - Class 6-12 NCERT Solutions",
    description: "Comprehensive mathematics learning platform with chapter-wise NCERT content, formula library, interactive 3D shapes, and practice quizzes for Class 6-12.",
    canonical: "/learn",
    type: "website",
  },
  about: {
    title: "About Mathrix - Free Maths Learning Platform",
    description: "Learn about Mathrix - India's free mathematics learning platform for Class 6-12 students. NCERT-aligned content, interactive 3D shapes, and practice quizzes.",
    canonical: "/about",
    type: "website",
  },
};