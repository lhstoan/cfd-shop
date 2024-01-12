const featuredReducer = (state = "all", action) => {
	switch (action.type) {
		case "UPDATE":
			return action.payload || "all";
		default:
			return state;
	}
};

export default featuredReducer;