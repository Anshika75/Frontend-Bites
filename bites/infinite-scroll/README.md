# Infinite Scroll

Load more items automatically as user scrolls to the bottom. Perfect for feeds, product listings, and galleries.

## Features

- Automatic loading when user reaches bottom
- Loading state indicators
- Error handling
- Customizable threshold

## Usage

Import the `useInfiniteScroll` hook and use it in your component.

```tsx
import { useInfiniteScroll } from '@/bites/infinite-scroll/useInfiniteScroll'

export function MyComponent() {
  const { items, hasMore, isLoading } = useInfiniteScroll({
    fetchMore: async () => {
      // Fetch more items
    },
  })

  return (
    // Your component JSX
  )
}
