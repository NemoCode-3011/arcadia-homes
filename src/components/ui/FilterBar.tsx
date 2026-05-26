interface FilterBarProp {
  active: string
  onFilterChange: (filter: string) => void
}

const FilterBar = ({active, onFilterChange}: FilterBarProp) => {
  const filters = ["All", "For Sale", "For Rent"]

  return (
    <div className="flex gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${active === filter 
          ? "bg-arcadia-moss text-arcadia-cream" 
          : "bg-arcadia-stone text-arcadia-sand hover:text-arcadia-cream"}`}>
            {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterBar