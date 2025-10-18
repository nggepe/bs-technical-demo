# How to Run This App

1. Clone this repository
2. Install dependencies using `npm install`
3. Run the app using `npm run dev`
4. Open your browser and go to `http://localhost:5173/`

# Assumption

1. The data fetching is using throttle `1 second` to make sure you can see the loading state.
2. The table is using client-side pagination. The default page size is 10. You can change the previous page only if the current page is not the first page. You can change the next page only if the current page is not the last page. I implement this condition to avoid the user to go to the non-existent page.
3. The table is using client-side sorting. You can click the table header to sort the products, click again to toggle the sort direction, and click the table header again to remove the sort.
4. The functionality of the app is using search params to filter, search, sort, and paginate the list views. So you can still see the filter or even the search condition even you refresh the page. Also you can share the current state of the app using url.
5. The unit test is build using vitest. Because vitest is fast and easy to use.
6. You can run the unit test using `npm run test`
7. You can run the coverage test using `npm run test:coverage`

# What was completed vs skipped.

## Acceptance List

- Shows a loading UI before data appears. ✅
- Displays all items with required fields. ✅
- Search filters by name. ✅
- Category filter works. ✅
- Sort by price &amp; rating (both directions). ✅
- Can mark/unmark favorites. ✅
- “Show favorites only” works. ✅
- Favorites persist across refresh. ✅
- Sensible empty states and basic accessibility. ✅

## Requirements

- Fetch data from a local JSON (simulate an API). ✅
- List view shows item name, category, price, rating, and a favorite toggle (★/☆). ✅
- Search by name (case-insensitive, partial matches). ✅
- Filter by category (dropdown with “All” + unique categories from data). ✅
- Sort by price and rating (ascending/descending). ✅
- Favorites: ✅
  - Toggle favorite for any item. ✅
  - Persist favorites in localStorage so a reload keeps them. ✅
  - Provide a “Show favorites only” switch. ✅
- Empty states:
  - No results (search/filter combined), show a friendly message. ✅
- Loading state: ✅
  - Show a loading indicator while “fetching”. ✅

## Skipped

There is no skipped requirements and acceptance list.

# Bonus Implementation

- Debounced search (e.g. 300ms) ✅.
- Client-side pagination (e.g. 8-10 per page) ✅.
- Unit tests for 1-2 critical bits (filtering/sorting/favorites) ✅.
