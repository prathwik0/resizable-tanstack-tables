# Resizable TanStack Tables

Play with the code at [CodePen](https://codepen.io/prathwik0/pen/OPJpepv).

This is a lightweight React hook for creating resizable [TanStack Table](https://tanstack.com/table/latest) columns with customized behavior.

## Features

- 🎉 Play with the code at [CodePen](https://codepen.io/prathwik0/pen/OPJpepv).
- 🔄 Smooth column resizing with proportional distribution
- 📏 Respects min/max column width constraints
- 🚀 Optimized for performance with large datasets
- 📱 Responsive design that adapts to container width
- 🧩 Easy integration with TanStack Table v8+
- 📦 Works with React 16.8+
- 🔧 Compatible with TypeScript and JavaScript
- 🔄 Use as esm, cjs imports or via CDN

## Installation

You can install the package using one of the following package managers:

- **npm**

  ```bash
  npm install resizable-tanstack-tables
  ```

- **pnpm**

  ```bash
  pnpm add resizable-tanstack-tables
  ```

- **bun**
  ```bash
  bun add resizable-tanstack-tables
  ```

You can also use the package directly from a CDN:

```html
<!-- From unpkg -->
<script src="https://unpkg.com/resizable-tanstack-tables@latest/dist/index.umd.js"></script>

<!-- From jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/resizable-tanstack-tables@latest/dist/index.umd.js"></script>
```

When using via CDN, the `useResize` hook is available via the global variable `ResizableTanstackTables`:

```js
const { useResize } = ResizableTanstackTables;
```

## Quick Start

```tsx
import { useReactTable } from "@tanstack/react-table";
import { useResize } from "resizable-tanstack-tables";

function MyTable() {
  // Initialize the resize hook
  const {
    columnSizing,
    setColumnSizing,
    columnSizingInfo,
    setColumnSizingInfo,
    tableContainerRef,
    updateColumnConstraints,
  } = useResize();

  // Create your table with the resize state
  const table = useReactTable({
    // ... your table config
    state: {
      columnSizing,
      columnSizingInfo,
      // ... other state
    },
    onColumnSizingChange: setColumnSizing,
    onColumnSizingInfoChange: setColumnSizingInfo,
    columnResizeMode: "onChange",
    // ... other options
  });

  // Update column constraints when columns change
  React.useEffect(() => {
    updateColumnConstraints(table);
  }, [columns, updateColumnConstraints, table]);

  return <div ref={tableContainerRef}>{/* Your table component */}</div>;
}
```

## Detailed Usage

### 1. Import the hook

```tsx
import { useResize } from "resizable-tanstack-tables";
```

### 2. Initialize the hook in your component

```tsx
function DataTable({ data, columns }) {
  const {
    columnSizing,
    setColumnSizing,
    columnSizingInfo,
    setColumnSizingInfo,
    tableContainerRef,
    updateColumnConstraints,
    containerWidth,
  } = useResize();

  // ... rest of your component
}
```

### 3. Connect the hook to your TanStack table

```tsx
const table = useReactTable({
  data,
  columns,
  state: {
    columnSizing,
    columnSizingInfo,
    // ... other state
  },
  defaultColumn: {
    minSize: 60, // Minimum column width
    maxSize: 800, // Maximum column width
  },
  onColumnSizingChange: setColumnSizing,
  onColumnSizingInfoChange: setColumnSizingInfo,
  getCoreRowModel: getCoreRowModel(),
  columnResizeMode: "onChange",
});
```

### 4. Update column constraints when columns change

```tsx
React.useEffect(() => {
  updateColumnConstraints(table);
}, [columns, updateColumnConstraints, table]);
```

### 5. Add the container ref to your table wrapper

```tsx
return <div ref={tableContainerRef}>{/* Your table component */}</div>;
```

### 6. Apply column sizes to your table cells

```tsx
// Create CSS variables for column sizes
const columnSizeVars = React.useMemo(() => {
  const vars = {};
  table.getFlatHeaders().forEach((header) => {
    vars[`--col-${header.id}-size`] = `${header.getSize()}`;
  });
  return vars;
}, [table, columnSizing]);

// Apply to your table
<table style={columnSizeVars}>
  {/* ... */}
</table>

// Apply to your cells
<td
  style={{
    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
    maxWidth: `calc(var(--col-${cell.column.id}-size) * 1px)`,
  }}
>
  {/* cell content */}
</td>
```

## Performance Optimization

For optimal performance during resizing, especially with large datasets, consider memoizing your table body:

```tsx
// Un-memoized table body component
function TableBodyContent({ table }) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              style={{
                width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                maxWidth: `calc(var(--col-${cell.column.id}-size) * 1px)`,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

// Memoized table body for better performance during resizing
const MemoizedTableBody = React.memo(
  TableBodyContent,
  (prev, next) => prev.table.options.data === next.table.options.data
);

// Use the memoized body during resizing
{
  table.getState().columnSizingInfo.isResizingColumn ? (
    <MemoizedTableBody table={table} />
  ) : (
    <TableBodyContent table={table} />
  );
}
```

## API Reference

### `useResize()`

Returns an object with the following properties:

| Property                  | Type                              | Description                           |
| ------------------------- | --------------------------------- | ------------------------------------- |
| `columnSizing`            | `ColumnSizingState`               | Current column sizing state           |
| `setColumnSizing`         | `Function`                        | Function to update column sizing      |
| `columnSizingInfo`        | `ColumnSizingInfoState`           | Current column sizing info state      |
| `setColumnSizingInfo`     | `Function`                        | Function to update column sizing info |
| `tableContainerRef`       | `React.RefObject<HTMLDivElement>` | Ref to attach to the table container  |
| `updateColumnConstraints` | `Function`                        | Function to update column constraints |
| `containerWidth`          | `number`                          | Current width of the table container  |

## Contributing

Contributions are welcome! Please feel free to submit a [Pull Request](https://github.com/prathwik0/resizable-tanstack-tables/pulls).

## Issues

Found a bug or have a feature request? Please open an [issue](https://github.com/prathwik0/resizable-tanstack-tables/issues).

## License

[MIT](./LICENSE) © [prathwik](https://github.com/prathwik0)
