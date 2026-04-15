// const data = [
//   { id: '1', name: 'Item 1' },
//   { id: '2', name: 'Item 2' },
//   { id: '3', name: 'Item 3' },
// ]

// export default function MyList() {
//   const { items, DndProvider } = useSortableList({
//     items: data,
//     getId: (item) => item.id,
//     onChange: (updated) => console.log(updated),
//   })

//   return (
//     <DndProvider>
//       {items.map((item) => (
//         <SortableItem key={item.id} id={item.id}>
//           {item.name}
//         </SortableItem>
//       ))}
//     </DndProvider>
//   )
// }
'use client'
import Select from '@/comopents/common/select/Index'
import { useState } from 'react'


export default function Example() {
  const [value, setValue] = useState('')

  return (
    <Select
      label="Mark as Required?"
      required
      value={value}
      onChange={setValue}
      placeholder="Select Mark As Required?"
      options={[
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ]}
    />
  )
}