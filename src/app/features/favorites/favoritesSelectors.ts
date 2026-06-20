import type { RootState } from "../../store"

export const favoritesCountSelector=(state:RootState)=>state.favorites.value.length;