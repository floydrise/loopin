import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSession } from "@/lib/auth_client.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const beforeLoadAuth = async () => {
  const { data } = await getSession();
  return data;
};

/*
     1.   _ 2 ... 7
     2.   1 _ 3 ... 7
     3.   1 2 _ 4 ... 7
     4.   1 ... 3 _ 5 ... 7
     5.   1 ... 4 _ 6 7
     6.   1 ... 5 6 7
    * If total num of pages is equal to 5, return an array filled from 1 to 5 and display all nums without ellipsis
    * else create a left sibling and a right sibling constant
    * left sibling will be Math.max between the current page - 1 and 2 -> Math.max(page - 1, 2)
    * EXPLANATION: if we assign left sibling to page - 1, if page === 1, then the left sibling is 0, which we dont want to display
    * -> if page is 2, left sibling will be 2
    * -> if page is 3, left sibling will be 2
    * -> if page is 4, left sibling will be 3, before three we will have an ellipsis
    * right sibling will be Math.min between current page + 1 and numOfPages - 1 -> Math.min(page + 1, numOfPages - 1)
    * EXPLANATION: if we look at the fourth case, if we assign rightSibling to page + 1 and push ellipsis after that, all is good, if we
    * on the other hand are on page 5, right sibling is 6 and we push ellipsis, the last page is 7 -> 4 5 6 ... 7 , not what we want
    * if we are on page 5, Math.min(page + 1, numOfPages - 1) will evaluate to 6, later in the code rightSibling < numOfPages - 1 will be "false", so
    * we wont push an ellipsis
    * start by pushing 1 into the array -> this is always the first value
    * if the left sibling is larger than 2, push 'ellipsis' string into the array
    * then create a for-i loop starting from left sibling and finishing at right sibling and push the indices in the array
    * if rightSibling < numOfPages - 1 -> push ellipsis
    * finally push numOfPages as the last number in the array
    * */
export const paginationRangeAlgorithm = (page: number, numOfPages: number) => {
  const blocks = 5; // amount of visible page links without ellipsis
  if (numOfPages <= blocks)
    return new Array(numOfPages).fill(null).map((_, index) => index + 1);

  const leftSibling = Math.max(page - 1, 2);
  const rightSibling = Math.min(page + 1, numOfPages - 1);
  const pages = [];

  pages.push(1);
  if (leftSibling > 2) pages.push("ellipsis");

  for (let i = leftSibling; i <= rightSibling; ++i) {
    pages.push(i);
  }

  if (rightSibling < numOfPages - 1) pages.push("ellipsis");
  pages.push(numOfPages!);

  return pages;
};
