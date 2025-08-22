async function enhanceText() {
    document.getElementById("loadingText").style.display = "block"
    document.getElementById("textArea").style.display = "none"
    document.getElementById("enhanceButton").disabled = true;

    const text = document.getElementById("before").value
    // Validate text
    // 512 characters

    const model = document.getElementById("model").value
    // Validate it's within range 0 1 2 3

    const mode = document.getElementById("mode").value
    // Validate it's within range 0 1 2 3

    try {
        const response = await fetch("http://127.0.0.1:8404/api/enhanceText", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "mode": mode,
                "text": text
            })
        });
        const obj = await response.json()
        console.log(obj.result);

        document.getElementById("after").value = obj.result

        const text1 = text
        const text2 = obj.result;
        const [highlightedText1, highlightedText2] = compareAndHighlight(text1, text2);
        document.getElementById("after").innerHTML = highlightedText2;

    } catch (e) {
        //document.writeln("You are cooked")
    }

    document.getElementById("enhanceButton").disabled = false;
    document.getElementById("loadingText").style.display = "none"
    document.getElementById("textArea").style.display = "block"


}

async function reset() {

}


function compareAndHighlight(str1, str2) {
    // Simple approach: split by spaces to get words.
    // For more robust parsing (punctuation, etc.), you might use regex.
    const words1 = str1.split(/\s+/); // Split by one or more whitespace characters
    const words2 = str2.split(/\s+/);

    let resultHtml1 = '';
    let resultHtml2 = '';

    // Iterate through the words, up to the length of the longer text
    const maxLength = Math.max(words1.length, words2.length);

    for (let i = 0; i < maxLength; i++) {
        const word1 = words1[i] || ''; // Get word or empty string if array ends
        const word2 = words2[i] || '';

        if (word1 === word2 && word1 !== '') {
            // If words are identical, just add them as is (with a space)
            resultHtml1 += word1 + ' ';
            resultHtml2 += word2 + ' ';
        } else {
            // If words are different, wrap them in our highlight span!
            if (word1 !== '') {
                resultHtml1 += `<span class="text-success">${word1}</span> `;
            }
            if (word2 !== '') {
                resultHtml2 += `<span class="text-success">${word2}</span> `;
            }
        }
    }
    // Trim any trailing space
    return [resultHtml1.trim(), resultHtml2.trim()];
}
