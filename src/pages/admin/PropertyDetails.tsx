import { useNavigate, useParams} from "react-router-dom"
import { properties } from "../../data/properties"


const PropertyDetails = () => {
  const {id} = useParams()

  const navigate = useNavigate()
  const property = properties.find((p)=> p.id === id)

  if (!property) {
    return(
      <div className="p-6">
        <p className="text-arcadia-cream">Property not found</p>
      </div>
    )
  }


  return (
    <div className="p-3 lg:p-6">
      <button onClick={() => navigate("/properties")} className="text-2xl text-arcadia-sand "> ← Back to Properties</button>
      <div>
        <img src={property.image} alt="property" className="w-full h-96 object-cover rounded-xl mt-4" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

        {/* Left — property details, takes 2/3 of space */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-arcadia-cream">{property.houseType}</h2>
          <p className="text-arcadia-sand mt-1">📍 {property.location}</p>
          <p className="text-xl font-semibold text-arcadia-leaf mt-3">
            ₦{property.price.toLocaleString()}
          </p>
          <hr className="border-arcadia-bark my-6" />
          <div className="flex gap-6">
            <p className="text-arcadia-cream">🛏 {property.bedrooms} Bedrooms</p>
            <p className="text-arcadia-cream">🚿 {property.bathrooms} Bathrooms</p>
          </div>
          <hr className="border-arcadia-bark my-6" />
          <h3 className="text-arcadia-cream font-semibold mb-2">Description</h3>
          <p className="text-arcadia-sand leading-relaxed">{property.description}</p>
        </div>
        {/*  agent card */}
        <div className="bg-arcadia-stone rounded-xl p-6 h-fit">
          <h3 className="text-arcadia-cream font-semibold mb-4">Contact Agent</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-arcadia-moss flex items-center justify-center text-arcadia-cream font-bold">{property.agent.name.charAt(0)}</div>
            <p className="text-arcadia-cream font-medium">{property.agent.name}</p>
          </div>
          <hr className="border-arcadia-bark my-4" />
          <p className="text-arcadia-sand text-sm">📞 {property.agent.phone}</p>
          <p className="text-arcadia-sand text-sm mt-2">📧 {property.agent.email}</p>
          <hr className="border-arcadia-bark my-4" />
          <button className="w-full py-3 rounded-lg bg-arcadia-moss text-arcadia-cream text-sm font-medium hover:bg-arcadia-leaf transition-colors">
            Schedule Viewing
          </button>
          <button className="w-full py-3 rounded-lg bg-arcadia-bark text-arcadia-cream text-sm font-medium mt-3 hover:bg-arcadia-stone transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
