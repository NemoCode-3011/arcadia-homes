import { Menu } from 'lucide-react';


interface TopBarProp {
  onMenuclick: () => void
}
const Topbar =  ({onMenuclick} : TopBarProp) => {
  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-6 border-b bg-arcadia-stone border-arcadia-bark">
        <button 
        onClick={onMenuclick}
        className="lg:hidden text-arcadia-cream text-xl">
          <Menu />
        </button>
      <h1 className="text-sm lg:text-base text-arcadia-cream font-medium">Welcome back, Temilade</h1>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-arcadia-sand bg-arcadia-moss">T
      </div>
    </header>
  )
}

export default Topbar