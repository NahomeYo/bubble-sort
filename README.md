# Elementary Algorithms

## Code

```javascript
/**
 * Sort an array with bubble sort and stop early if a pass makes no swaps.
 *
 * @param {number[]} values Input array.
 * @returns {number[]} The same array reference, sorted in ascending order.
 */
function bubble(values) {
    for (let end = values.length - 1; end > 0; end--) {
        let swapped = false;

        for (let index = 0; index < end; index++) {
            if (values[index] > values[index + 1]) {
                const temp = values[index];
                values[index] = values[index + 1];
                values[index + 1] = temp;
                swapped = true;
            }
        }

        // If no swap occurred, the remaining prefix is already sorted.
        if (!swapped) {
            break;
        }
    }

    return values;
}

/**
 * Sort an array with insertion sort.
 *
 * @param {number[]} values Input array.
 * @returns {number[]} The same array reference, sorted in ascending order.
 */
function insertion(values) {
    for (let index = 1; index < values.length; index++) {
        const key = values[index];
        let position = index - 1;

        // Shift larger values right until the insertion point is found.
        while (position >= 0 && values[position] > key) {
            values[position + 1] = values[position];
            position--;
        }

        values[position + 1] = key;
    }

    return values;
}

/**
 * Sort an array with selection sort.
 *
 * @param {number[]} values Input array.
 * @returns {number[]} The same array reference, sorted in ascending order.
 */
function selection(values) {
    for (let start = 0; start < values.length - 1; start++) {
        let smallest = start;

        for (let index = start + 1; index < values.length; index++) {
            if (values[index] < values[smallest]) {
                smallest = index;
            }
        }

        const temp = values[start];
        values[start] = values[smallest];
        values[smallest] = temp;
    }

    return values;
}

/**
 * Search for a target value with linear search.
 *
 * @param {number[]} values Input array.
 * @param {number} target Value to locate.
 * @returns {number} Index of the target, or -1 if absent.
 */
function linearSearch(values, target) {
    for (let index = 0; index < values.length; index++) {
        if (values[index] === target) {
            return index;
        }
    }

    return -1;
}

/**
 * Run the elementary-algorithms demonstration.
 *
 * @returns {void}
 */
function main() {
    const array = [42, 7, 91, 18, 63, 25, 4, 77, 56, 13];
    const linearTarget = 63;

    console.log("Original array =", array);
    console.log("Bubble sort =", bubble([...array]));
    console.log("Insertion sort =", insertion([...array]));
    console.log("Selection sort =", selection([...array]));
    console.log("Linear search target =", linearTarget);
    console.log("Linear search result index =", linearSearch(array, linearTarget));
}

main();
```

## Bubble Sort

### Complexity

- Best: O(n)
- Worst: O(n^2)
- Avg: O(n^2)
- Space: O(1)

### Problem Description

Bubble sort is one of the most straightforward sorting methods because it repeatedly compares adjacent values and swaps them when they are out of order. As those swaps keep happening, larger values gradually move toward the end of the array, which is why the algorithm is said to make values "bubble" upward.

Even though bubble sort is easy to understand, it is not efficient for large inputs. Its main value is as a simple example of repeated passes, adjacent comparisons, and in-place swapping.

### Algorithm Steps

1. Scan the array from left to right, comparing each adjacent pair.
2. Swap a pair whenever the left value is greater than the right value.
3. After one pass, the largest unsorted value has moved to the end of the unsorted region.
4. Repeat on the remaining unsorted prefix until no swaps are needed.

### Explanation

This version uses a swapped flag so it can stop early when the array is already sorted. That matters because a basic bubble sort always performs all of its passes, even when the data becomes sorted before the algorithm finishes. With the swapped flag, the algorithm can recognize that a full pass made no changes and stop immediately.

That early stop gives bubble sort a best case of `O(n)` when the input is already sorted or nearly sorted. In the average and worst cases, however, bubble sort still performs quadratic work because it may need many passes and many swaps. The main advantage is that it sorts in place and therefore uses only constant extra space.

In this JavaScript version, the swap is done with a temporary variable and direct index assignment, so the array is updated in place. The demo in `main()` uses the spread operator to make copies such as `[...array]` before sorting, which keeps the original sample input unchanged for the other examples.

### Example/Demo

```text
Original array = [42, 7, 91, 18, 63, 25, 4, 77, 56, 13]
Sorted array = [4, 7, 13, 18, 25, 42, 56, 63, 77, 91]
```

## Insertion Sort

### Complexity

- Best: O(n)
- Worst: O(n^2)
- Avg: O(n^2)
- Space: O(1)

### Problem Description

Insertion sort builds a sorted prefix one value at a time by inserting each new value into its correct position among the values that have already been processed. It works much like sorting a small hand of cards by taking one card at a time and sliding it into the right place.

Because of that structure, insertion sort is often much better on small inputs or nearly sorted arrays than its worst-case complexity alone might suggest.

### Algorithm Steps

1. Treat the first element as a sorted prefix of length one.
2. Take the next value as the key to insert.
3. Shift larger sorted values one position to the right.
4. Place the key into the gap that remains.

### Explanation

Insertion sort is efficient on small or nearly sorted inputs because each key may need to move only a short distance before it reaches its correct position. When the array is already close to sorted, the shifting work is limited, which is why insertion sort has a best case of `O(n)`.

Its average and worst-case runtime are still `O(n^2)` because in a poorly ordered array each new key may need to move past many earlier elements. Even so, the algorithm remains useful because it sorts in place, needs only `O(1)` extra space, and has a very simple structure.

In JavaScript, the key part of the implementation is the `while` loop that shifts larger values to the right one position at a time. The algorithm does not call array helpers like `sort()`; instead, it relies on direct index updates so each move is easy to follow in the code.

### Example/Demo

```text
Original array = [42, 7, 91, 18, 63, 25, 4, 77, 56, 13]
Sorted array = [4, 7, 13, 18, 25, 42, 56, 63, 77, 91]
```

## Selection Sort

### Complexity

- Best: O(n^2)
- Worst: O(n^2)
- Avg: O(n^2)
- Space: O(1)

### Problem Description

Selection sort repeatedly finds the smallest value in the unsorted suffix and swaps it into the next sorted position. Rather than moving values little by little, it makes one direct selection for each position in the final sorted order.

That makes the algorithm conceptually simple: each pass chooses exactly which value should come next in the sorted prefix. The tradeoff is that it still has to scan the remaining unsorted values every time.

### Algorithm Steps

1. Assume the first unsorted position holds the smallest remaining value.
2. Scan the rest of the unsorted suffix to find the true minimum.
3. Swap that minimum into the next sorted position.
4. Repeat until the unsorted suffix is empty.

### Explanation

Selection sort performs the same number of comparisons regardless of the input order because each pass must still scan the remaining unsorted suffix to discover the smallest value. For that reason, the runtime stays `O(n^2)` in the best, average, and worst cases.

Its main strengths are simplicity and low memory usage. The algorithm sorts in place, uses `O(1)` extra space, and performs relatively few swaps compared with some other elementary sorting methods, even though the total number of comparisons remains quadratic.

In the JavaScript code, the inner loop updates the index of the current minimum, and then one final swap is done with a temporary variable after the scan finishes. Like the other elementary sorting examples, it uses direct array indexing instead of built-in helpers, which makes the actual algorithm steps very visible.

### Example/Demo

```text
Original array = [42, 7, 91, 18, 63, 25, 4, 77, 56, 13]
Sorted array = [4, 7, 13, 18, 25, 42, 56, 63, 77, 91]
```

## Linear Search

### Complexity

- Best: O(1)
- Worst: O(n)
- Avg: O(n)
- Space: O(1)

### Problem Description

Linear search scans the array from left to right until it finds the target value or reaches the end. It is the most direct searching method because it does not rely on sorting, indexing tricks, or any extra data structure.

That simplicity makes linear search broadly applicable. If the array is small or unsorted, a direct scan is often the easiest correct method to use.

### Algorithm Steps

1. Start at the first element of the array.
2. Compare the current value to the target.
3. Return the current index as soon as a match is found.
4. Continue until the array ends, then return `-1` if the target is absent.

### Explanation

Linear search works on any unsorted or sorted array because it does not rely on any special ordering. The algorithm simply checks each value in order until it either finds the target or runs out of elements to inspect.

Its best case is `O(1)` when the target appears immediately, but in the worst case it must inspect every element, which gives a runtime of `O(n)`. Even though it is not asymptotically fast, its simplicity makes it very useful for small inputs and straightforward lookup tasks.

In JavaScript, this implementation is just a basic `for` loop with a strict equality check, `===`, and it returns the index of the match rather than the value itself. If nothing is found, it returns `-1`, which is the usual JavaScript-style signal that the target is not present.

### Example/Demo

```text
Original array = [42, 7, 91, 18, 63, 25, 4, 77, 56, 13]
Target = 63
Result index = 4
```
