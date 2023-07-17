import assert from "assert";
import { Problem } from "@/models/problem.model";

const starterCodeRomanToInteger = `
/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s){
  // Write your code here
};`;

// checks if the user has the correct code
const handlerRomanToInteger
= (fn: any) => {
	try {
		const tests = [
			"III",
			"LVIII",
			"MCMXCIV",
		];
		const answers = [3, 58, 1994];
		for (let i = 0; i < tests.length; i++) {
			const result = fn(tests[i]);
			assert.equal(result, answers[i]);
		}
		return true;
	} catch (error: any) {
		console.log("Error from romanToIntegerHandler: ", error);
		throw new Error(error);
	}
};

export const romanToInteger: Problem = {
	id: "roman-to-integer",
	title: "6. Roman to Integer",
	problemStatement: `<p class='mt-3'>Roman numerals are represented by seven different symbols: <code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.
</p>
<div class='example-card'><pre>
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
</pre></div>
<p class='mt-3'>For example, <code>2</code> is written as <code>II</code> in Roman numeral, just two ones added together. <code>12</code> is written as <code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>
<p class='mt-3'>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:
</p>
<p class='mt-3'>
<li>I can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.</li>
<li>X can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.</li>
<li>C can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>
</p>
<p class='mt-3'>Given a roman numeral, convert it to an integer.</p>
`,
	examples: [
		{
			id: 1,
			inputText: 's = "III"',
			outputText: "3",
			explanation: "III = 3.",
		},
		{
			id: 2,
			inputText: 's = "LVIII"',
			outputText: "58",
			explanation: "L = 50, V= 5, III = 3.",
		},
		{
			id: 3,
			inputText: 's = "MCMXCIV"',
			outputText: "1994",
			explanation: "M = 1000, CM = 900, XC = 90 and IV = 4.",
		},
	],
	constraints: `<li class='mt-2'>
  <code>1 ≤ s.length ≤ 15</code>
</li> <li class='mt-2'>
<code>s</code> contains only the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.
</li> <li class='mt-2'>
It is <strong>guaranteed</strong> that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.
</li>`,
	handlerFunction: handlerRomanToInteger,
	starterCode: starterCodeRomanToInteger,
	order: 6,
	starterFunctionName: "function romanToInt(",
};
