import assert from "assert";
import { Problem } from "@/models/problem.model";

const starterCodePalindromeNumber = `
/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x){
  // Write your code here
};`;

// checks if the user has the correct code
const handlerPalindromeNumber
= (fn: any) => {
	try {
		const tests = [121, -121, 10];
		const answers = [true, false, false];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from palindromeNumberHandler: ", error);
		throw new Error(error);
	}
};

export const palindromeNumber: Problem = {
	id: "palindrome-number",
	title: "7. Palindrome Number",
	problemStatement: `<p class='mt-3'>Given an integer <code>x</code>, return true <i>if <code>x</code> is a <span class="tooltip">palindrome<span class="tooltiptext">An integer is a palindrome when it reads the same forward and backward.</br>For example, 1771 is a palindrome while 1177 is not.</span></span>, and <code>false</code> otherwise.</i></p>`,
	examples: [
		{
			id: 1,
			inputText: 'x = 121',
			outputText: "true",
			explanation: "121 reads as 121 from left to right and from right to left.",
		},
		{
			id: 2,
			inputText: "x = -121",
			outputText: "false",
			explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.",
		},
		{
			id: 3,
			inputText: "x = 10",
			outputText: "false",
			explanation: "Reads 01 from right to left. Therefore it is not a palindrome.",
		},
	],
	constraints: `<li class='mt-2'>
<code>-2<sup>31</sup> ≤ x ≤ 2<sup>31</sup> - 1</code></li>
`,
	handlerFunction: handlerPalindromeNumber,
	starterCode: starterCodePalindromeNumber,
	order: 7,
	starterFunctionName: "function isPalindrome(",
};
