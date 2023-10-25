interface ActionButtonProps {
  action?: () => void
  text?: string
}

export default function ActionButton({ action, text }: ActionButtonProps) {
  return (
    <>
      <button
        onClick={action}
        className='bg-violet-600 px-3 py-2 rounded-lg hover:bg-violet-700 hover:scale-105 transition-all'>
        {text}
      </button>
    </>
  )
}