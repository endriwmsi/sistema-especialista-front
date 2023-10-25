import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { ElementType, useEffect } from "react"

interface ButtonProps {
  icon: ElementType
  text?: string,
  hasActions?: boolean,
  switchAction?: () => void 
}

export function SwitchButton({ icon: Icon, hasActions = false, switchAction, text }: ButtonProps) {
  useEffect(() => {
    if (hasActions && switchAction) {
      tippy('.switch-button', {
        content: text || 'Tooltip Content',
      });
    }
  }, [hasActions, switchAction, text]);

  return (
    <>
      <button
        className="switch-button flex justify-center items-center bg-zinc-800 rounded-lg p-2 hover:bg-zinc-700 shadow-xs hover:scale-105 hover:shadow-lg transition-all"
        onClick={switchAction}
        data-tippy-content={text || 'Tooltip Content'} // Adicione o atributo data-tippy-content
      >
        <Icon className="w-6 h-6 text-violet-600 hover:animate-spin" />
      </button>
    </>
  )
}