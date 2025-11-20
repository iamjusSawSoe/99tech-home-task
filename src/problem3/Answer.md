# Problem 3: Messey React

## Critical Issues

### 1. **Undefined Variable Reference (`lhsPriority`)**

**Location:** Filter function inside `useMemo`

```typescript
if (lhsPriority > -99) {
```

**Problem:** The variable `lhsPriority` is never defined. It should be `balancePriority`.

**Impact:** This will cause a runtime `ReferenceError` and crash the application.

---

### 2. **Inverted Filter Logic**

**Location:** Filter function

```typescript
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
return false;
```

**Problem:** The logic is backwards. It:

- Keeps balances with amount ≤ 0 (zero or negative)
- Filters OUT balances with positive amounts or priority = -99

**Impact:** Only displays worthless/negative balances, hiding actual wallet value.

**Correct logic should be:** Keep balances where `priority > -99 AND amount > 0`

---

### 3. **Incorrect `useMemo` Dependency Array**

**Location:** `useMemo` dependencies

```typescript
}, [balances, prices]);
```

**Problem:** Includes `prices` as a dependency but `prices` is never used in the memoized computation.

**Impact:** Unnecessary re-computations whenever `prices` changes, defeating the purpose of memoization.

---

### 4. **Missing Type Definition**

**Location:** `WalletBalance` interface

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}
```

**Problem:** The code references `balance.blockchain` in `getPriority()`, but `blockchain` property is not defined in the interface.

**Impact:** TypeScript compilation error or runtime undefined behavior.

---

### 5. **Double Iteration Over Same Data**

**Location:** `formattedBalances` and `rows` mapping

```typescript
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
```

**Problem:**

- Creates `formattedBalances` but never uses it
- Maps over `sortedBalances` again to create `rows`
- Two separate O(n) operations that could be one

**Impact:** Wasted computation and memory allocation.

---

### 6. **Type Mismatch in Second Map**

**Location:** `rows` mapping

```typescript
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
```

**Problem:** Types `balance` as `FormattedWalletBalance` but it's actually `WalletBalance` (from `sortedBalances`). The code then accesses `balance.formatted` which doesn't exist.

**Impact:** Runtime error - `balance.formatted` will be `undefined`.

---

### 7. **Anti-Pattern: Using Array Index as React Key**

**Location:** `rows` mapping

```typescript
key = { index };
```

**Problem:** Using array index as key is an anti-pattern when the list can change order/content.

**Impact:**

- Poor reconciliation performance
- Potential bugs with component state
- React may not properly update/reorder components

**Solution:** Use unique identifier like `balance.currency` or a combination of currency+blockchain.

---

### 8. **Incomplete Sort Comparison**

**Location:** Sort function

```typescript
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
```

**Problem:** No `return 0` when priorities are equal.

**Impact:** Undefined behavior when two items have the same priority (inconsistent sorting).

---

### 9. **Non-Specific Type (`any`)**

**Location:** `getPriority` parameter

```typescript
const getPriority = (blockchain: any): number => {
```

**Problem:** Uses `any` type, eliminating TypeScript's type safety benefits.

**Impact:** No compile-time checking, potential runtime errors.

---

### 10. **`getPriority` Should Be Outside Component**

**Location:** Function definition inside component

**Problem:** `getPriority` is recreated on every render despite being a pure function with no dependencies.

**Impact:** Minor performance overhead, unnecessary function allocations.

---

### 11. **Unused Props Destructuring**

**Location:** Component signature

```typescript
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
```

**Problem:** Destructures `children` but never uses it.

**Impact:** Minor - confusing code, no functional issue.

---

## Refactored Version

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

// Moved outside component - pure function
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props; // Removed unused children
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Fixed: Keep balances with priority > -99 AND amount > 0
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // Descending order, with proper equality handling
      });
  }, [balances]); // Removed prices from dependencies

  // Single iteration: format and render in one pass
  const rows = sortedBalances.map((balance: WalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // Use unique identifier instead of index
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
```
