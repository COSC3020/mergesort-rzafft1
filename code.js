
// passed all tests
let arr = [5, 3, 8, 2, 6, 1, 0, 9];
//let arr = [1,1, 0];
//let arr = [1, 0, 0, 0];
//let arr = [0, 0, 0, 0, 0];
let x = mergesort(arr);
console.log("Unsorted: " + arr);
console.log("Sorted  : " + x);


function sort (x)
{
    var left, right, mid, size;

    size = x.length;

    // start with i equal to 1, we need to get sorted lists of length 1 first
    // we increment i by a multiple of 2, so we get sorted lists of length, 1, 2, 4, 8, 16 and so on
    // we will create sorted lists while i is less than the size of the array
    for (let i = 1; i < size; i *= 2) // stop when the midpoint, which could is a multiple of i, is less than the size
    {   
        // here we need to actually go through the list and create a list of sorted lists of length i, at a position left and right
        // we stop once i is greater than the final position that the right positionwill need to be at, (size of array - length needed for right array)
        // we increment left by the size of each sorted list, and since we are builing at least two sorted lists per iteration, we increment left by i times 2
        for (left = 0; left < size - i; left += i * 2) 
        {
            right = left + i * 2 - 1;  
            mid = left + i - 1; 

            // since we are creating lists of length i, it is possible that the right position holds a list 
            // that contains elements that are not within our array bounds, these will be undefined elements
            // in this case which happens when the right index, is greater or equal to the size of the array, 
            // we need to shift the right index (# of undefined elements in right) positions to the left

            var overflow = right - size // if over flow is less than zero the right index is in bounds, 
                                        // if it is zero or greater, we are trying to merge a right list that has out of bounds elements
            if (overflow >= 0)
            {
                right = shiftPos(right, overflow) // shift right to the left by the number of out of bounds elements it contains 
            }

            merge(x, left, right, mid); // merge sorted list at left and sorted list at right 
        }
    }
    return x;
}

function mergesort(x) 
{
    return sort(x);
}

function shiftPos (start, shift) // check if start of array is in bounds, if it is do nothing, if it isnt, tweak the right position
{ 
    if (shift == 0) // we are only reaching one element over bounds 
    {
        return start - 1 // shift right index 1 postion to the left
    }
    else if (shift == 1) // we are reaching two elements over bounds 
    {
        return start - 2 // shift right index 2 postions to the left
    }
    else // we are reaching three elements over bounds, with our implementation, it is not possible to go more than three elements over bounds
    {
        return start - 3 // shift right index 3 postions to the left
    }
}

  

function merge (arr, indexLeft, indexRight, midpoint)
{
    // store length of left subarray
    let lengthL = midpoint - indexLeft + 1;
    // store length of right subarray
    let lengthR = indexRight - midpoint;

    // create left array with elements between leftIndex and midpoint
    let L = [];
    for (let i = 0; i < lengthL; i++) {
        L[i] = arr[indexLeft + i]; }
        
    // create right array with elements between midpoint and rightIndex
    let R = [];
    for (let i = 0; i < lengthR; i++) {
        R[i] = arr[midpoint + i + 1] }

    // counters to track the increments of the left and right subarrays
    let countL = 0, countR = 0; 
    // index tracks the position that we are adding to in original array
    let index = indexLeft; 
    // this will determine the break of our loop
    let unmerged = true;
    
    while (unmerged)
    {      
        // if the value at L is less than the value at R, 
        // or if countR >= lengthR (meaning there are no more elements in the right array to evaluate)
        // we add the value at L to the sorted array
        if (L[countL] < R[countR] || countR >= lengthR)
        {
            arr[index] = L[countL];
            countL++;
        }
        // otherwise, the value at R is greater than the value at L 
        // and the right subarray still has values to evaluate so we add the right value to the sorted array
        else
        {
            arr[index] = R[countR];
            countR++;
        }
        // increment to the next index of the sorted array that we will insert at
        index++;
        // if either subarrays have been completley evaluated
        if (countL >= lengthL || countR >= lengthR)
        {
            // insert the remaining elements in the left subarray
            // if the subarray has not been completley evaluated
            while (countL < lengthL) 
            {
                arr[index] = L[countL];
                countL++;
                index++;
            }
            // insert the remaining elements in the right subarray
            // if the subarray has not been completley evaluated
            while (countR < lengthR)
            {
                arr[index] = R[countR];
                countR++;
                index++;
            }
            // break the loop
            unmerged = false;
        }
    }

}


