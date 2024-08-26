import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scissors, Clock, Users, Calendar } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const promotions = [
  {
    code: "NEWRIDER",
    discount: "20% OFF",
    description: "For first-time renters",
    icon: Users,
    instructions: "Enter code at checkout. Valid for your first rental only.",
  },
  {
    code: "SUMMERRIDE",
    discount: "15% OFF",
    description: "Summer season special",
    icon: Calendar,
    instructions: "Apply code when booking. Valid from June 1st to August 31st.",
  },
  {
    code: "EARLYBIRD",
    discount: "10% OFF",
    description: "Early morning rentals",
    icon: Clock,
    instructions: "Use code for rentals starting before 10 AM.",
  },
]

export default function CouponsAndDiscounts() {
  const [activeTab, setActiveTab] = useState("current")

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: "Coupon code copied!",
        description: `${code} has been copied to your clipboard.`,
      })
    })
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Save More</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
            Coupons & Discounts
          </h2>
          <p className="text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Enjoy special offers and save on your next bike rental adventure!
          </p>
        </div>

        <Tabs defaultValue="current" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current" onClick={() => setActiveTab("current")}>Current Offers</TabsTrigger>
            <TabsTrigger value="howto" onClick={() => setActiveTab("howto")}>How to Apply</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <div className="grid gap-6 mt-6">
              {promotions.map((promo, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <promo.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{promo.discount}</h3>
                          <p className="text-sm text-muted-foreground">{promo.description}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => copyToClipboard(promo.code)}
                      >
                        <Scissors className="mr-2 h-4 w-4" />
                        {promo.code}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted px-6 py-4">
                    <p className="text-sm text-muted-foreground">{promo.instructions}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="howto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">How to Apply Coupons</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Select your desired bike and rental period on our website or app.</li>
                  <li>Proceed to the checkout page.</li>
                  <li>Look for the "Promo Code" or "Coupon Code" field.</li>
                  <li>Enter the coupon code exactly as shown (codes are case-sensitive).</li>
                  <li>Click "Apply" or "Submit" to add the discount to your order.</li>
                  <li>Verify that the discount has been applied before completing your purchase.</li>
                </ol>
                <p className="mt-4 text-sm text-muted-foreground">
                  Note: Only one coupon code can be used per rental. Discounts cannot be combined unless otherwise stated.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}