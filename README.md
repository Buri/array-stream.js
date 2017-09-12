# array-stream.js

This library provides ...
Sample use:
```typescript
const selection = 
    new Collection(['apple', 'pear', 'banana', 'pineapple', 'kiwi'])
        .select(i => i.indexOf('a') !== -1)
        .select(i => i.indexOf('p') !== -1)
        .range(2,3)
        .sort()
        .toArray()
// selection === ['pear', 'pineapple']
```
