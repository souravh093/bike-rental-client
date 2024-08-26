import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Sarah founded Bike Rental Service with a passion for sustainable transportation and urban exploration. With over 15 years of experience in the cycling industry, she leads our team with vision and enthusiasm.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    bio: "Michael ensures our day-to-day operations run smoothly. His background in logistics and customer service helps us deliver an exceptional experience to every rider.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Emma Rodriguez",
    role: "Chief Marketing Officer",
    bio: "Emma brings our story to life. Her creative marketing strategies have put Bike Rental Service on the map and continue to inspire more people to choose two wheels.",
    image: "/placeholder.svg?height=300&width=300",
  },
];

const milestones = [
  { year: 2010, event: "Bike Rental Service founded with a fleet of 50 bikes" },
  { year: 2013, event: "Expanded to 5 locations across the city" },
  { year: 2015, event: "Introduced electric bikes to our fleet" },
  { year: 2018, event: "Launched our mobile app for easy bookings" },
  { year: 2020, event: "Reached 1 million rides milestone" },
  { year: 2023, event: "Expanded to 10 cities nationwide" },
];

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        About Bike Rental Service
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-lg">
              At Bike Rental Service, our mission is to promote sustainable
              urban mobility and enrich lives through cycling. We strive to
              provide accessible, high-quality bikes that empower people to
              explore their cities, reduce their carbon footprint, and embrace a
              healthier lifestyle. Our commitment to excellent service, safety,
              and environmental responsibility drives everything we do.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">
                  {member.name}
                </h3>
                <p className="text-center text-muted-foreground mb-4">
                  {member.role}
                </p>
                <p className="text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-4">
              {milestones.map((milestone, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-lg py-1 px-3">
                    {milestone.year}
                  </Badge>
                  <span>{milestone.event}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span>123 Bike Lane, Cycling City, CC 12345</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary" />
              <span>info@bikerentalservice.com</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
