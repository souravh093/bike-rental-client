import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bike, MapPin, Clock, Shield, Wrench, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/variant";
const benefits = [
  {
    title: "Wide Range of Bikes",
    description:
      "Choose from our extensive fleet of high-quality bikes for all ages and skill levels.",
    icon: Bike,
  },
  {
    title: "Convenient Locations",
    description:
      "Multiple pickup and drop-off points throughout the city for your convenience.",
    icon: MapPin,
  },
  {
    title: "Flexible Rental Periods",
    description: "Rent by the hour, day, or week - whatever suits your needs.",
    icon: Clock,
  },
  {
    title: "Safety First",
    description:
      "All our bikes are regularly maintained and come with complimentary helmets.",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    description:
      "Our team is always ready to assist you with any issues or questions.",
    icon: Wrench,
  },
  {
    title: "Affordable Pricing",
    description:
      "Competitive rates with discounts for longer rentals and frequent riders.",
    icon: CreditCard,
  },
];

export default function WhyChooseUs() {
  return (
    <div className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-background to-muted">
      <div
        className="absolute inset-0 bg-repeat bg-center opacity-5 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="container mx-auto relative z-10">
        <motion.div
          variants={fadeIn("right", 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="secondary">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
            Ride with Confidence
          </h2>
          <p className="text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Discover why thousands of cyclists trust us for their biking
            adventures. We're committed to providing the best rental experience
            on two wheels.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
