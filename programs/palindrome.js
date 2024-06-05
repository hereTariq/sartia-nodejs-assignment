function isPalindrome(argument) {
    argument = argument.toString();

    let reverse = '';
    for (let i = argument.length - 1; i >= 0; i--) {
        reverse += argument[i];
    }

    if (argument == reverse) {
        console.log(`${argument} is palindrom`);
    } else {
        console.log(`${argument} is not palindrom`);
    }
}

isPalindrome('abcdcba');
