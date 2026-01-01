# Debounce Search

Optimize search input with debouncing to reduce API calls and improve performance. Essential for real-time search.

## Features

- Debounce input to reduce API calls
- Customizable delay
- Loading states
- Error handling

## Usage

Import the `useDebounce` hook in your search component.

```tsx
import { useDebounce } from '@/bites/debounce-search/useDebounce'

export function SearchComponent() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      // Perform search
    }
  }, [debouncedQuery])

  return (
    // Your search input JSX
  )
}
