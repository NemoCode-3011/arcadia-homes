export interface GeneralEnquiry {
  id: string
  name: string
  email: string
  phone: string
  intent: "Buy" | "Rent" | "Sell"
  message: string
  assignedAgentId: string | null
  createdAt: string
  isRead: boolean
}

export const generalEnquiries: GeneralEnquiry[] = [
  {
    id: "g1",
    name: "Chioma Eze",
    email: "chioma.eze@gmail.com",
    phone: "08123456789",
    intent: "Rent",
    message: "Looking for a 3 bedroom apartment in Lekki, budget around 2-3 million per year.",
    assignedAgentId: null,
    createdAt: "1 hour ago",
    isRead: false,
  },
  {
    id: "g2",
    name: "Tunde Bakare",
    email: "tunde.b@gmail.com",
    phone: "07098765432",
    intent: "Buy",
    message: "Interested in purchasing a duplex in Ikoyi or VI. Budget up to 80 million.",
    assignedAgentId: null,
    createdAt: "5 hours ago",
    isRead: false,
  },
  {
    id: "g3",
    name: "Grace Okonjo",
    email: "grace.okonjo@gmail.com",
    phone: "08056781234",
    intent: "Sell",
    message: "I have a property in Banana Island I'd like to list with Arcadia.",
    assignedAgentId: "1",
    createdAt: "Yesterday",
    isRead: true,
  },
]