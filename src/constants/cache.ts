import { UserState } from "../store/userSlice";

let userCache: UserState | null = null;
const userItem = localStorage.getItem("user");
if (userItem) {
  userCache = JSON.parse(userItem);
}

export { userCache };
