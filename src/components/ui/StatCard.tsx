import type React from "react"

interface StatCardProps {
  title: string,
  value: number,
  change: string
}
const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {

  return (
    <>
      <div className="rounded-xl  bg-arcadia-stone w-full"> 
        <p className="text-sm font-medium text-arcadia-sand " >{title}</p>
        <h2 className="text-3xl font-semibold text-arcadia-cream">{value}</h2>
        <p className="text-sm mt-1 text-arcadia-moss" >{change}</p>
      </div></>
  )
}

export default StatCard