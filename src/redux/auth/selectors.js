export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectToken = state => state.auth.token;
export const selectUserName = state => state.auth.name;
export const selectUserEmail = state => state.auth.email;
export const selectIsLoading = state => state.auth.loading;
