import { useDebugValue, useEffect, useState } from "react";


const useScrollFix = () => {
    const [preventSpace, setPreventSpace] = useState(false);
    useDebugValue("preventSpace")

    useEffect(() => {
        function onKeyDown (e: KeyboardEvent) {
            if(e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                setPreventSpace(true);
                return true;
           }
           if(e.code === "Space" && preventSpace) {
            e.preventDefault();
            return true;
        }
        return true
        }
    
        function onKeyUp(e: KeyboardEvent) {
            if(e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                setPreventSpace(false);
                console.log('here at up/down keydown');
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
