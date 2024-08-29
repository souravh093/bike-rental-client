import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Bike, CheckCircle2, Star } from 'lucide-react'

// Mock data for bikes
const bikes = [
  { id: 1, name: "Mountain Explorer", type: "Mountain", frame: "Aluminum", gears: 21, weight: 14, price: 25, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "City Cruiser", type: "City", frame: "Steel", gears: 7, weight: 16, price: 20, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Speed Demon", type: "Road", frame: "Carbon Fiber", gears: 22, weight: 8, price: 35, image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Electric Dream", type: "Electric", frame: "Aluminum", gears: 1, weight: 22, price: 40, image: "/placeholder.svg?height=100&width=100" },
]

const presetBikes = bikes.slice(0, 3) // Use the first three bikes as presets

const calculateScore = (bike: typeof bikes[0], category: string) => {
  switch (category) {
    case 'Speed':
      return bike.type === 'Road' ? 90 : bike.type === 'Electric' ? 80 : 70
    case 'Comfort':
      return bike.type === 'City' ? 90 : bike.type === 'Electric' ? 85 : 75
    case 'Off-road':
      return bike.type === 'Mountain' ? 95 : 60
    case 'Value':
      return 100 - (bike.price / 0.4) // Assuming max price is $40
    default:
      return 50
  }
}

export default function Component() {
  const [selectedBike, setSelectedBike] = useState<typeof bikes[0] | null>(null)

  const handleBikeSelect = (bikeId: string) => {
    const bike = bikes.find(b => b.id === parseInt(bikeId))
    setSelectedBike(bike || null)
  }

  const renderStars = (score: number) => {
    const stars = Math.round(score / 20)
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Compare Bikes</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a bike to compare:</h2>
        <Select onValueChange={handleBikeSelect}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Choose a bike" />
          </SelectTrigger>
          <SelectContent>
            {bikes.map((bike) => (
              <SelectItem key={bike.id} value={bike.id.toString()}>
                <div className="flex items-center gap-2">
                  <Bike className="h-4 w-4" />
                  {bike.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-muted rounded-lg p-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Feature</TableHead>
              <TableHead>Your Selection</TableHead>
              {presetBikes.map(bike => (
                <TableHead key={bike.id}>{bike.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Image</TableCell>
              <TableCell>
                {selectedBike ? (
                  <img src={selectedBike.image} alt={selectedBike.name} className="w-24 h-24 object-cover rounded-lg" />
                ) : (
                  <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground">Select a bike</div>
                )}
              </TableCell>
              {presetBikes.map(bike => (
                <TableCell key={bike.id}>
                  <img src={bike.image} alt={bike.name} className="w-24 h-24 object-cover rounded-lg" />
                </TableCell>
              ))}
            </TableRow>
            {['Type', 'Frame', 'Gears', 'Weight', 'Price'].map(feature => (
              <TableRow key={feature}>
                <TableCell className="font-medium">{feature}</TableCell>
                <TableCell>
                  {selectedBike ? (
                    feature === 'Weight' ? `${selectedBike[feature.toLowerCase() as keyof typeof selectedBike]} kg` :
                    feature === 'Price' ? `$${selectedBike[feature.toLowerCase() as keyof typeof selectedBike]}/day` :
                    selectedBike[feature.toLowerCase() as keyof typeof selectedBike]
                  ) : '-'}
                </TableCell>
                {presetBikes.map(bike => (
                  <TableCell key={bike.id}>
                    {feature === 'Weight' ? `${bike[feature.toLowerCase() as keyof typeof bike]} kg` :
                     feature === 'Price' ? `$${bike[feature.toLowerCase() as keyof typeof bike]}/day` :
                     bike[feature.toLowerCase() as keyof typeof bike]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="text-xl font-semibold mt-8 mb-4">Performance Comparison</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Category</TableHead>
              <TableHead>Your Selection</TableHead>
              {presetBikes.map(bike => (
                <TableHead key={bike.id}>{bike.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {['Speed', 'Comfort', 'Off-road', 'Value'].map(category => (
              <TableRow key={category}>
                <TableCell className="font-medium">{category}</TableCell>
                <TableCell>
                  {selectedBike ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateScore(selectedBike, category)} className="w-20" />
                        <span>{calculateScore(selectedBike, category)}%</span>
                      </div>
                      <div className="flex mt-1">
                        {renderStars(calculateScore(selectedBike, category))}
                      </div>
                    </>
                  ) : '-'}
                </TableCell>
                {presetBikes.map(bike => (
                  <TableCell key={bike.id}>
                    <div className="flex items-center gap-2">
                      <Progress value={calculateScore(bike, category)} className="w-20" />
                      <span>{calculateScore(bike, category)}%</span>
                    </div>
                    <div className="flex mt-1">
                      {renderStars(calculateScore(bike, category))}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 text-center">
        <Button size="lg" disabled={!selectedBike}>
          Rent {selectedBike ? selectedBike.name : 'Selected Bike'}
        </Button>
      </div>
    </div>
  )
}