import { useEffect, useState } from "react";

export function useUtils()
{
    const [width, setWidth] = useState(window.innerWidth);
    const handleSize = () => setWidth(window.innerWidth);
    const isMobile = width < 500;
    
    useEffect(() => {
        window.addEventListener('resize', handleSize);
        return () => window.removeEventListener('resize', handleSize);
    }, []);
      
    return {isMobile}
}