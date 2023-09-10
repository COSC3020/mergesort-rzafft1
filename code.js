/* PLANNING 

Mergesort 

- basically we are going to use a divide and conquer method divide the array into
  sorted arrays, and then merge them into a single sorted array

    - part 1 : how could we merge two sorted halves of an array?

        -> well if both havles are sorted and we need to return an array...
            
                   L       R
        (i = 0)    4  and  2  
        (i = 1)    5       3
        (i = 2)    7       6

        say we are returning a single merged array, M,
        we could compare each element in L and R at i, 
            and if L[i] < R[i] then we push L[i] to M, 
            otherwise we push R[i] to M

        the problem with the approach above is that we 
        will end up with an array half the size of the original
        in the case above, we will get the array 2 3 6 ... not good
        
        this indicates that we will need two iterations, a left 
        and a right, and if we insert an element from a left array
        we can increment a left variable and the same for the right 
        ... however ... this cannot be done with a for loop, after 
        all we have two iterations, we need a while loop, or recursion. 
        lets do a while loop. 

        lets use a while(true) loop and set a left increment equal to 0 and a right
        increment equal to 0 and compare L to R and insert the smaller 
        element into our new array and increment its corresponding counter. 

        we need to be careful when comparing the L and R subarrays using individual
        counters for both L and R. For example, if the right counter is greater 
        than the length of the right subarray, we dont want to compare it to the left
        subarray. So in this case, instead of checking if L[leftIncrement] < R[rightIncrement] we just need to 
        add L[leftIncrement] to our sorted array, since, rightIncrement > rightLength therefore, 
        R[rightIncrement] would be out of bounds. So instead of just checking if  L[leftIncrement] < R[rightIncrement]
        or if R[rightIncrement] < L[leftIncrement] we also need to make sure the left and right 
        incrments are in bounds (in this case, this means they are less then the lengths of their
        corresponding subarrays)

        we know that if either the left or right array's corresponding counters
        are greater than thier correspoinding subarray lengths, 
        we want to stop comparing elements, since we will be out of bounds.
        this means we may still have some elements left that we have not yet 
        evaluated in the left or right subarrays. This means we need to allow these
        left over values to be added into the sorted array. we could check 
        for this case with a simple if statement and then use two seperate while
        loops to add remaining elements from the left or right subarrays into the 
        sorted array while their counter is less than its corresponding array length
        so lets check to see if either
        arrays are empty, and if they arnt (since we know one of them should already
        be empty), lets fill the new array with the 
        remaining elements of the non empty array. now we can break the loop. 

        there is still a complication here. currently we are talking about create a function with
        parameters that ask for a left array and a right array... this is not very practicle... 
        because in our sort function we will have to create a left and right array rather than 
        just rearranging the indices. So instead of having parameters (arrLeft[], arrRight[]), 
        lets ask for the array itself, a right index, a left index, and a midpoint, so that we 
        can split the array into a left and right array AFTER we call the merge function. 

    - part 2 : now for the second part, how can we sort the array 
      without using recursion and instead using a combination of loops and 
      our merge function 

      - bubble sort type approach?
      - we need to divide the array into sorted arrays
            - we could create multiple arrays of length 1, which can be considered sorted
      - we could then use our merge function to merge the sorted arrays into a single sorted array

      - essentially we will need to take a pair of the list, a left and right subarray, 
      starting with index 0 (left) and index 1 (right) 
      (a left and right element, each size of one, therefore each list is sorted), 
      and call the merge function on the pair (it will be ideal to not return an array from merge), 
      then we will need to incrmement our left and right index to jump to evaluate the next pair, 
      2, 3 and call the merge function on 

      x = [6, 3, 8, 2, 5, 3]

      * we will need to start with L and R at index 0 and 1 

      left  = [3] --> L = 0                     * sorted list of length 1 at index 0 (left)
      right = [2] --> R = 1                     * sorted list of length 1 at index 1 (right)
      
      merge(L, R) --> x = [3, 6, 2, 8, 5, 3]    * sorted list of length 2, at index 0-1,          

      left  = [8] --> L = 2                     * sorted list of length 1 at index 2 (left)
      right = [2] --> R = 3                     * sorted list of length 1 at index 3 (right)

      merge(L, R) --> x = [3, 6, 2, 8, 5, 3]    * sorted list of length 2, at index 0-1,            

      ... go through the whole array and sort pairs in multiples of 2

      ... now we have a list of sorted pairs (next we want a list of sorted quads)

      * now will need to start with L and R at index 0 and 2 

      x = [3, 6, 2, 8, 3, 5]

      left  = [3, 6] --> L = 0                  * sorted list of length 2 at index 0 (right)
      right = [2, 8] --> R = 2                  * sorted list of length 2 at index 2 (right)

      merge(L, R) --> x = [2, 3, 6, 8, 3, 5]    * sorted lists of length 2, at index 0-3,         

      left  = [2, 3, 6, 8]     --> L = 4       
      right = [3, 5, NaN, NaN] --> R = 8        * account for array bounds

      ... go through whole array and sort quads in multiples of 4

      ... now we have a list of sorted quads (next we would want a list of sorted 8ths) 

      * we would want to start with L and R at index 0 and 4 
    
      ... go through whole array and sort 8ths in multiples of 8

      ... now we have a list of sorted 8ths (next we want a list of sorted 16ths)
      
      * we would want to start with L and R at index 0 and 8

      WHEN DO WE KNOW THE LIST IS SORTED? when index L is equal to the midpoint, we know we only need to merge one more time and then the list will be sorted 

*/

let arrIterative = [6, 3, 8, 2, 5, 3, 1, 0];
mergesort(arrIterative);
console.log("Iterative Approach : " + arrIterative);


// im having trouble calculating the right index, i think this should be the only major error here. 
function sort (x, tmp)
{
    var left, right, mid, size;

    size = x.length;

    // start with i equal to 1, we need to get sorted lists of length 1 first
    // we increment i by a multiple of 2, so we get sorted lists of length, 1, 2, 4, 8, 16 and so on
    // we will create sorted lists until i is equal to the size of the array, meaning the list is divided into two sorted halfs
    for (i = 1; i < size; i *= 2) // stop when the midpoint, which could is a multiple of i, is less than the size
    {   
        // here we need to actually go through the list create a list of sorted lists of length i
        // we stop once i is greater than the final position that right will need to be at, (size of array - length needed for right array)
        // we increment left by the size we want the sorted list to be times 2, since we want a pairs of sorted lists
        for (left = 0; left < size - i; left += i * 2) 
        {
            if (i == 1)
            {
                right = left + i
            }
            else if (left == 0)
            {
                right = i;
            }
            else
            {
                right = left * 2
            }
            mid = Math.floor((left+right)/2);
            merge(x, left, right, mid);
            console.log("left ("+left+"), right("+right+"), mid("+mid+"), x("+x+")")
        }
        console.log("-------------------")
    }

}

function mergesort(x) 
{
    sort(x);
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
