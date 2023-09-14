[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11719209&assignment_repo_type=AssignmentRepo)
# Mergesort

Implement an iterative (no recursive calls) and in-place version of mergesort.
Use the template I've provided in `code.js`. Test your new function; I've
provided some basic testing code that uses
[jsverify](https://jsverify.github.io/) in `code.test.js`.

Hint: To make merge sort in-place, think about what happens during the merge --
where are elements moved to and from? To make it iterative, think about the
part of the array each recursive call considers.

## Runtime Analysis

Analyse the time complexity of your implementation and give a $\Theta$ bound for
its worst-case runtime. Add your answer, including your reasoning, to this
markdown file.

  1. (outer loop) for (let i = 1; i < size; i *= 2)

     - here we divide the array in half, therefore if we let x equal the number 
    of times we need to divide the array in half then x should be equal to x = log2(n)
    since we are basically creating a binary tree by dividing our list in half x times, 
    where x can be equal to the height of the binary tree 

  2. (inner loop) for (left = 0; left < size - i; left += i * 2)

     - the inner loop has a worst-case complexity of O(n) where n is the length of the two combined
       halves from the previous outer loop calculation. Whether this array is sorted, or unsorted,
       it doesn't matter, we do the same amount of work by calling the merge function on the two halves,
       which has a complexity of O(n) where is is the size of the array. Merge primarily uses a single loop
       that runs n times. We also have a shift function, however, this returns a constant calculation, therefore,
       we can ignore this, along with our right, mid, and overflow calculations. 

- so we have an outer loop that runs at a complexity of log2(n), an inner loop with a complexity, n, and then
  the call to our merge function which also has a complexity of n. When we combine this we get
  $\Theta$ = n + log(n) * n. However, we can remove constants here since we are talking about asymptotic complexity,
  therefore, $\Theta$ = log(n) ... $\Theta$ = n*log(n). This is the complexity for a worst-case scenario, which is actually
  the same complexity that we would get if we were to analyze the best-case scenario. When talking about any asymptotic analysis,
  we are looking at the runtime as n, the size of the input, changes, therefore it would be incorrect to say this worst-case complexity
  would be different than the best-case complexity for an input which for example, could be a single element. Although the runtime in 
  this case would be O(1) this is irrelevant since we care about what happens when n is growing. As the size of the input array grows,
  the runtime will be the same for any case, which is n + log(n) * n, therefore, $\Theta$ = n + log(n) * n. 

**How could I make this algorithm sort in place?**
- in my merge function, we use a left and right array to store the elements that need to be merged, and then we take out elements from each subarray and insert them back into the original array in their designated location. This could be done without building any subarrays, however, we would have to keep track of the start and ending indices of the left and right subarrays so that we are staying in bounds and only sorting the elements that we want to be sorted. So instead of creating a left and right subarray in merge, we just need to create a left and right variable that each hold the starting point of where the subarray started in the original array and a ending point that describes where the subarray would have ended in the original array. As long as we can keep track of the original positions of the subarrays, we can sort in place. 
