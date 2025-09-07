const problems = {
  'arrays-hashing': [
    {
      id: 1,
      difficulty: 'Easy',
      name: 'Two Sum',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  You can return the answer with smaller index first.`,
      constraints: ['2 <= nums.length <= 1000', '-10,000,000 <= nums[i] <= 10,000,000', '-10,000,000 <= target <= 10,000,000'],
      exampleInput: 'nums = [2,7,11,15], target = 9',
      exampleOutput: '[0,1]'
    },
    {
      id: 2,
      difficulty: 'Easy',
      name: 'Contains Duplicate',
      description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
      constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
      exampleInput: 'nums = [1,2,3,1]',
      exampleOutput: 'true'
    }
  ],
  'two-pointers': [
    {
      id: 3,
      difficulty: 'Easy',
      name: 'Valid Palindrome',
      description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.`,
      constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters'],
      exampleInput: 's = "A man, a plan, a canal: Panama"',
      exampleOutput: 'true'
    },
    {
      id: 4,
      difficulty: 'Medium',
      name: 'Container With Most Water',
      description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
      constraints: ['2 <= height.length <= 10^5', '0 <= height[i] <= 10^4'],
      exampleInput: 'height = [1,8,6,2,5,4,8,3,7]',
      exampleOutput: '49'
    }
  ],
  'sliding-window': [
    {
      id: 5,
      difficulty: 'Easy',
      name: 'Maximum Subarray Sum of Size K',
      description: `Given an array of positive integers nums and an integer k, find the maximum sum of any contiguous subarray of size k.`,
      constraints: ['1 <= nums.length <= 10^5', '1 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
      exampleInput: 'nums = [2, 1, 5, 1, 3, 2], k = 3',
      exampleOutput: '9'
    },
    {
      id: 6,
      difficulty: 'Medium',
      name: 'Longest Substring Without Repeating Characters',
      description: `Given a string s, find the length of the longest substring without repeating characters.`,
      constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols, and spaces.'],
      exampleInput: 's = "abcabcbb"',
      exampleOutput: '3'
    }
  ],
  'stack': [
    {
      id: 7,
      difficulty: 'Easy',
      name: 'Valid Parentheses',
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:
  1. Open brackets must be closed by the same type of brackets.
  2. Open brackets must be closed in the correct order.`,
      constraints: ['1 <= s.length <= 10^4'],
      exampleInput: 's = "({[]})"',
      exampleOutput: 'true'
    },
    {
      id: 8,
      difficulty: 'Easy',
      name: 'Next Greater Element I',
      description: `The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two arrays nums1 and nums2 where nums1 is a subset of nums2. Return an array of the next greater element for each element in nums1, in their order of appearance in nums2. If it does not exist, return -1 for this element.`,
      constraints: [
        '1 <= nums1.length <= nums2.length <= 1000',
        '0 <= nums1[i], nums2[i] <= 10^4',
        'All elements in nums1 and nums2 are unique.',
        'All elements of nums1 are in nums2.'
      ],
      exampleInput: 'nums1 = [4,1,2], nums2 = [1,3,4,2]',
      exampleOutput: '[-1,3,-1]'
    }
  ],
  'binary-search': [
    {
      id: 9,
      difficulty: 'Easy',
      name: 'Binary Search',
      description: `Given a sorted array of integers nums and a target value, return the index of the target in nums. If the target does not exist, return -1.`,
      constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i], target <= 10^4'],
      exampleInput: 'nums = [-1,0,3,5,9,12], target = 9',
      exampleOutput: '4'
    },
    {
      id: 10,
      difficulty: 'Medium',
      name: 'Search Insert Position',
      description: `Given a sorted array of distinct integers nums and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.`,
      constraints: ['1 <= nums.length <= 10^4', '-10^4 <= nums[i], target <= 10^4'],
      exampleInput: 'nums = [1,3,5,6], target = 5',
      exampleOutput: '2'
    }
  ],
  'linked-list': [
  {
    id: 11,
    difficulty: 'Easy',
    name: 'Reverse Linked List',
    description: `Given the head of a singly linked list, reverse the list and return its head.`,
    constraints: ['1 <= list.length <= 5000', '-5000 <= list[i] <= 5000'],
    exampleInput: '1->2->3->4->5',
    exampleOutput: '5->4->3->2->1'
  },
  {
    id: 12,
    difficulty: 'Hard',
    name: 'Add Two Numbers',
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.`,
    constraints: ['1 <= list1.length, list2.length <= 100', '0 <= list1[i], list2[i] <= 9'],
    exampleInput: '2->4->3, 5->6->4',
    exampleOutput: '7->0->8'
  }
]

};

export default problems;
