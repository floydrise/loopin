import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import guy1 from "/guy1.jpg"
import guy2 from "/guy2.jpg"
import guy3 from "/guy3.jpg"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: guy1,
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: guy2,
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: guy3,
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
