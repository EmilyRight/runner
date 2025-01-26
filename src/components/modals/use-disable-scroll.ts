
import { useEffect } from "react"

export const useDisableScroll = (disable: boolean) => {
    useEffect(() => {
		if (disable) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "scroll";
		};
	}, [disable]);
}