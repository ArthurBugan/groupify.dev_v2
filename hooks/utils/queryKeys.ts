export const queryKeys = {
	users: () => ["users"],
	user: (id) => ["user", id],
	posts: () => ["posts"],
	post: (id) => ["post", id],
	auth: () => ["auth"],
	groups: (params?: { page?: number; limit?: number; search?: string }) =>
		params ? ["groups", params] : ["groups"],
	group: (id) => ["group", id],
};
