import { useDebugValue, useEffect, useState } from "react";

/**
 * This hook prevents space bar from scrolling
 * while scrolling using the arrow down or arrow
 * up buttons
 */
const useScrollFix = () => {
    const [preventSpace, setPreventSpace] = useState(false);
    useDebugValue("preventSpace")

    useEffect(() => {
        function onKeyDown (e: KeyboardEvent) {
            if(e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                setPreventSpace(true);
           }
           if(e.code === "Space" && preventSpace) {
            e.preventDefault();
          
        }
    
        }
    
        function onKeyUp(e: KeyboardEvent) {
            if(e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                setPreventSpace(false);
            }
        }
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);

            return () => {
                window.removeEventListener('keydown', onKeyDown);
                window.removeEventListener('keyup', onKeyUp);
            }
           
        
    }, [preventSpace]);
}

export default useScrollFix;
