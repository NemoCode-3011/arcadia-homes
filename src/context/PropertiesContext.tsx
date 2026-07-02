import { createContext, useContext, useState } from "react"
import { properties as initialProperties } from "../data/properties"

export interface Agent {
  id: string
  name: string
  phone: string
  email: string
}

export interface Property {
  id: string
  image: string
  status: string
  houseType: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  description: string
  agent: Agent
}

interface PropertiesContextType {
  properties: Property[]
  addProperty: (property: Property) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void
  reassignAgent: (propertyId: string, agent: Agent) => void
}

const PropertiesContext = createContext<PropertiesContextType | null>(null)

export const PropertiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties)

  const addProperty = (property: Property) => {
    setProperties((prev) => [property, ...prev])
  }

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }

  const reassignAgent = (propertyId: string, agent: Agent) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, agent } : p))
    )
  }

  return (
    <PropertiesContext.Provider value={{
      properties,
      addProperty,
      updateProperty,
      deleteProperty,
      reassignAgent,
    }}>
      {children}
    </PropertiesContext.Provider>
  )
}

export const useProperties = () => {
  const context = useContext(PropertiesContext)
  if (!context) throw new Error("useProperties must be used within PropertiesProvider")
  return context
}