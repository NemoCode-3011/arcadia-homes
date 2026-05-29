import { useNavigate } from "react-router-dom"

interface PropertyCardProps {
  image: string
  status: string
  houseType: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  id: string
  linkTo?: string  // add this
}

const PropertyCard = ({ image, status, houseType, location, price, bedrooms, bathrooms, id, linkTo }: PropertyCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      className="rounded-xl overflow-hidden bg-arcadia-stone cursor-pointer hover:scale-105 transition-transform"
      onClick={() => navigate(linkTo ?? `/listings/${id}`)}  // defaults to public if not passed
    >
      <img src={image} alt={houseType} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-arcadia-moss text-arcadia-cream">{status}</span>
        <h2 className="font-semibold text-lg text-arcadia-cream mt-2">{houseType}</h2>
        <p className="text-sm text-arcadia-sand mt-1">📍 {location}</p>
        <p className="text-lg font-semi-bold text-arcadia-leaf mt-2">₦ {price.toLocaleString()}</p>
        <p className="text-sm text-arcadia-sand mt-2">🛏️ {bedrooms} beds &nbsp; 🛁 {bathrooms} baths</p>
      </div>
    </div>
  )
}

export default PropertyCard