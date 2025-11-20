// Approach 1:  Using the mathematical formula
var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

// Approach 2: Using a for loop (iterative approach)
var sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Implementation C: Using recursion
var sum_to_n_c = function (n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};
