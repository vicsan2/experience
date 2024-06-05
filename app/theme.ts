import type { CustomFlowbiteTheme } from "flowbite-react"

export const theme: CustomFlowbiteTheme = {
  card: {
    root: {
      children: "bg-gray-900 rounded-lg",
    },
  },
  carousel: {
    root: {
      base: "relative h-full",
      leftControl: "absolute left-1 top-1/2 transform -translate-y-1/2",
      rightControl: "absolute right-1 top-1/2 transform -translate-y-1/2",
    },
    item: {
      wrapper: "w-full flex-shrink-0 transform snap-center",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth snap-x indiana-scroll-container indiana-scroll-container--hide-scrollbars",
    },
  },
}

export default theme
