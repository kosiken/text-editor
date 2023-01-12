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
        function onKeyDown(e: KeyboardEvent) {
            try {
                if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                    setPreventSpace(true);
                }
                if (e.code === "Space" && preventSpace) {
                    e.preventDefault();
                }
            } catch (err) {
                // if for some reason this fails ignore and continue with the app
            }

        }

        function onKeyUp(e: KeyboardEvent) {
            try {
                if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                    setPreventSpace(false);
                }
            } catch (err) {
                // if for some reason this fails ignore and continue with the app
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
