import { useEffect, useState } from "react";

function useHasMounted() {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return hasMounted;
}

export default useHasMounted;
