def bubble_sort(values):
    items = values[:]

    for end in range(len(items) - 1, 0, -1):
        swapped = False
        for index in range(end):
            if items[index] > items[index + 1]:
                items[index], items[index + 1] = items[index + 1], items[index]
                swapped = True
        if not swapped:
            break

    return items


if __name__ == "__main__":
    sample = [64, 34, 25, 12, 22, 11, 90]
    print("Original:", sample)
    print("Sorted:", bubble_sort(sample))
