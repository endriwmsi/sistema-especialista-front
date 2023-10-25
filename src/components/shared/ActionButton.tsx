import { ElementType} from "react"

interface ActionButtonProps {
  icon: ElementType;
  action: () => void;
}

export default function ActionButton({ action, icon: Icon }: ActionButtonProps) {
  return (
    <>
      <button
        onClick={action}
        className='bg-violet-600 rounded-lg p-2 shadow-xs hover:bg-violet-800 hover:scale-105 hover:shadow-lg transition-all'>
        <Icon className='w-4 h-4' />
      </button>
    </>
  )
}