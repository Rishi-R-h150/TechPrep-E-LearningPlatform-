const answersDSA = {
    "arrays-hashing": [
      {
        "id": 1,
        "name": "Two Sum",
        "solution": {
          "approach": "Use a hash map to store the difference between the target and each number.",
          "code": "function twoSum(nums, target) {\n  let map = {};\n  for (let i = 0; i < nums.length; i++) {\n    let complement = target - nums[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[nums[i]] = i;\n  }\n}",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(n)"
        }
      },
      {
        "id": 2,
        "name": "Contains Duplicate",
        "solution": {
          "approach": "Use a set to track elements as you iterate through the array.",
          "code": "function containsDuplicate(nums) {\n  let set = new Set();\n  for (let num of nums) {\n    if (set.has(num)) {\n      return true;\n    }\n    set.add(num);\n  }\n  return false;\n}",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(n)"
        }
      }
    ],
    "two-pointers": [
      {
        "id": 3,
        "name": "Valid Palindrome",
        "solution": {
          "approach": "Use two pointers to compare characters, skipping non-alphanumeric characters.",
          "code": "function isPalindrome(s) {\n  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    if (s[left] !== s[right]) {\n      return false;\n    }\n    left++;\n    right--;\n  }\n  return true;\n}",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(n)"
        }
      },
      {
        "id": 4,
        "name": "Container With Most Water",
        "solution": {
          "approach": "Use the two-pointer technique, starting from both ends of the array and moving towards the center.",
          "code": "function maxArea(height) {\n  let left = 0, right = height.length - 1, maxArea = 0;\n  while (left < right) {\n    let area = Math.min(height[left], height[right]) * (right - left);\n    maxArea = Math.max(maxArea, area);\n    if (height[left] < height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n  return maxArea;\n}",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(1)"
        }
      }
    ],
    "sliding-window": [
      {
        "id": 5,
        "name": "Maximum Subarray Sum of Size K",
        "solution": {
          "approach": "Use a sliding window to calculate the sum of a subarray of size k.",
          "code": "function maxSubArraySum(nums, k) {\n  let maxSum = 0, currentSum = 0;\n  for (let i = 0; i < nums.length; i++) {\n    currentSum += nums[i];\n    if (i >= k) {\n      currentSum -= nums[i - k];\n    }\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(1)"
        }
      },
      {
        "id": 6,
        "name": "Longest Substring Without Repeating Characters",
        "solution": {
          "approach": "Use the sliding window technique and a hash map to store the last seen index of characters.",
          "code": "function lengthOfLongestSubstring(s) {\n  let map = {}, left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (map[s[right]] !== undefined) {\n      left = Math.max(left, map[s[right]] + 1);\n    }\n    map[s[right]] = right;\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(min(n, m)) where n is the length of the string and m is the character set size"
        }
      }
    ],
    "stack": [
      {
        "id": 7,
        "name": "Valid Parentheses",
        "solution": {
          "approach": "Use a stack to store opening brackets and check for matching closing brackets.",
          "code": "function isValid(s) {\n  let stack = [];\n  for (let char of s) {\n    if (char === '(' || char === '{' || char === '[') {\n      stack.push(char);\n    } else {\n      let last = stack.pop();\n      if ((char === ')' && last !== '(') ||\n          (char === '}' && last !== '{') ||\n          (char === ']' && last !== '[')) {\n        return false;\n      }\n    }\n  }\n  return stack.length === 0;\n}",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(n)"
        }
      },
      {
        "id": 8,
        "name": "Next Greater Element I",
        "solution": {
          "approach": "Use a stack to keep track of elements and find the next greater element for each element in nums1.",
          "code": "function nextGreaterElement(nums1, nums2) {\n  let stack = [], map = {};\n  for (let num of nums2) {\n    while (stack.length && stack[stack.length - 1] < num) {\n      map[stack.pop()] = num;\n    }\n    stack.push(num);\n  }\n  return nums1.map(num => map[num] === undefined ? -1 : map[num]);\n}",
          "timeComplexity": "O(n + m) where n is the length of nums1 and m is the length of nums2",
          "spaceComplexity": "O(n)"
        }
      }
    ],
    "binary-search": [
      {
        "id": 9,
        "name": "Binary Search",
        "solution": {
          "approach": "Use binary search to find the target in the sorted array.",
          "code": "function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) {\n      return mid;\n    } else if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return -1;\n}",
          "timeComplexity": "O(log n)",
          "spaceComplexity": "O(1)"
        }
      },
      {
        "id": 10,
        "name": "Search Insert Position",
        "solution": {
          "approach": "Use binary search to find the target or the position where it should be inserted.",
          "code": "function searchInsert(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) {\n      return mid;\n    } else if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return left;\n}",
          "timeComplexity": "O(log n)",
          "spaceComplexity": "O(1)"
        }
      }
    ]
  }
export default answersDSA