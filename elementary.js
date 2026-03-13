function Bubble(S) {
    for (let i = 0; i < S.length; i++) { // Best: O(n)
        for (let j = 0; j < S.length; j++) { // Worst: O(n^2)
            if (S[j] > S[j + 1]) {
                let temp = S[j];
                S[j] = S[j + 1];
                S[j + 1] = temp;
            }
        }
    }

    return S; // Space/Extra memory: O(1)
}

function Insertion(S) {
    for (let i = 1; i < S.length; i++) { // Best: O(n)
        let key = S[i];
        let j = i - 1;

        while (j >= 0 && S[j] > key) { // Worst: O(n^2)
            S[j + 1] = S[j];
            j--;
        }

        S[j + 1] = key;
    }

    return S; // Space/Extra memory: O(1)
}

function Selection(S) {
    for (let i = 0; i < S.length - 1; i++) { // O(n)
        let smallest = i;

        for (let j = i + 1; j < S.length; j++) { // Best and Worst; 
            if (S[j] < S[smallest]) {
                smallest = j;
            }
        }

        let temp = S[i];
        S[i] = S[smallest]
        S[smallest] = temp;
    }

    return S; // Space and Time Comlexiy: O(1)
}

function Linear(S, target) {
    for (let i = 0; i < S.length; i++) { // Worst: O(n)
        if (S[i] === target) {
            return S[i]; // Best and Space: O(1) 
        }
    }
}

function main() {
    const array = [42, 7, 91, 18, 63, 25, 4, 77, 56, 13];
    const bubbleSort = Bubble(array);
    const insertionSort = Insertion(array);
    const selectionSort = Selection(array);
    const linearSort = Linear(array);

    console.log("Bubble Sort:", bubbleSort);
    console.log("Insertion Sort:", insertionSort);
    console.log("Selection Sort:", selectionSort);
    console.log("Linear Sort:", linearSort);
}

main();
