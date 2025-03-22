import { SiHtml5, SiCss3, SiJavascript, SiWordpress, SiTailwindcss, SiReact } from "react-icons/si"

// Reduced number of icons for better performance
export const techIcons = [
  { name: "HTML", id: 1, img: (props) => <SiHtml5 {...props} style={{ color: "#E34F26" }} /> },
  { name: "CSS", id: 2, img: (props) => <SiCss3 {...props} style={{ color: "#1572B6" }} /> },
  { name: "JavaScript", id: 3, img: (props) => <SiJavascript {...props} style={{ color: "#F7DF1E" }} /> },
  { name: "React", id: 4, img: (props) => <SiReact {...props} style={{ color: "#61DAFB" }} /> },
  { name: "Tailwind CSS", id: 5, img: (props) => <SiTailwindcss {...props} style={{ color: "#06B6D4" }} /> },
  { name: "WordPress", id: 6, img: (props) => <SiWordpress {...props} style={{ color: "#21759B" }} /> },
]

