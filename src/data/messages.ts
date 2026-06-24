export interface Message {
  id: string
  senderName: string
  senderEmail: string
  propertyId: string
  propertyName: string
  location: string
  agentId: string          // ← new field
  message: string
  isRead: boolean
  createdAt: string
}

export const messages: Message[] = [
  {
    id: "1",
    senderName: "John Doe",
    senderEmail: "johndoe@gmail.com",
    propertyId: "1",
    propertyName: "Luxury Villa",
    location: "Victoria Island, Lagos",
    agentId: "1",          // ← inherited from property's agentId
    message: "I am interested in this property, when can I schedule a viewing?",
    isRead: false,
    createdAt: "2 hours ago"
  },
  {
    id: "2",
    senderName: "Ada Okafor",
    senderEmail: "adaokafor@gmail.com",
    propertyId: "3",
    propertyName: "Modern Duplex",
    location: "Ikoyi, Lagos",
    agentId: "3",
    message: "When is the next available viewing date?",
    isRead: true,
    createdAt: "Yesterday"
  },
  {
    id: "3",
    senderName: "Emeka Nwachukwu",
    senderEmail: "emeka@gmail.com",
    propertyId: "8",
    propertyName: "Mansion",
    location: "Lekki, Lagos",
    agentId: "2",
    message: "Is the price negotiable? I would like to discuss further.",
    isRead: false,
    createdAt: "2 days ago"
  },
  {
    id: "4",
    senderName: "Funke Adeleke",
    senderEmail: "funke@gmail.com",
    propertyId: "5",
    propertyName: "Colonial Mansion",
    location: "Jericho, Ibadan",
    agentId: "4",
    message: "I am relocating from Abuja, can I do a virtual tour?",
    isRead: true,
    createdAt: "3 days ago"
  },
  {
    id: "5",
    senderName: "Bayo Martins",
    senderEmail: "bayo@gmail.com",
    propertyId: "10",
    propertyName: "Penthouse",
    location: "Banana Island, Lagos",
    agentId: "1",
    message: "What is included in the rent? Is it furnished?",
    isRead: false,
    createdAt: "4 days ago"
  },
]