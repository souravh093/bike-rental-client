import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { fadeIn } from "@/variant";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO, TechCorp",
    content:
      "This product has revolutionized our workflow. Highly recommended!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sam Lee",
    role: "Designer, CreativeCo",
    content: "The user interface is intuitive and the features are top-notch.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Jamie Smith",
    role: "Developer, CodeCraft",
    content:
      "I've never seen a tool so powerful yet easy to use. It's a game-changer!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Taylor Brown",
    role: "Marketing Manager, BrandBoost",
    content:
      "Our team's productivity has skyrocketed since we started using this.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function TestimonialsSection() {
  return (
    <div className="relative mt-20 py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2016/11/18/21/30/bike-1836962_1280.jpg')",
        }}
      />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={fadeIn("right", 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-xl">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-start p-6">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        {testimonial.content}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
