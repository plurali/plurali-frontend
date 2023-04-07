import { ref } from "vue";
import { User } from "./api/types";

export const error = ref<string|null>(null);

export const user = ref<User|null>(null);