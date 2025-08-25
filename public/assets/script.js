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

document.addEventListener('DOMContentLoaded', () => {
    // Your existing code for button listeners etc. can go here.

    // Get references to the radio buttons and the new wrapper div
    const newEmailRadio = document.getElementById('newEmail');
    const emailReplyRadio = document.getElementById('emailReply');
    const emailHistoryWrapper = document.getElementById('emailHistoryWrapper');

    // Function to show or hide the email history textarea
    function toggleEmailHistoryVisibility() {
        if (emailReplyRadio.checked) {
            // If "Reply to an email/s" is checked, show the wrapper
            emailHistoryWrapper.style.display = 'block';
        } else {
            // Otherwise (if "New Email" is checked), hide the wrapper
            emailHistoryWrapper.style.display = 'none';
            document.getElementById("emailHistory").value = "";
        }
    }

    // Add event listeners to both radio buttons
    // When their state changes, call our toggle function
    newEmailRadio.addEventListener('change', toggleEmailHistoryVisibility);
    emailReplyRadio.addEventListener('change', toggleEmailHistoryVisibility);

    // Call the function once when the page loads
    // This ensures the correct initial state based on which radio is checked by default
    toggleEmailHistoryVisibility();
});


async function generateEmail(){

    //Hide and show the thingies
    document.getElementById("generateEmailButton").disabled = true;
    document.getElementById("newEmail").disabled = true;
    document.getElementById("emailReply").disabled = true;
    document.getElementById("emailHistory").disabled = true;
    document.getElementById("title").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("relation").disabled = true;
    document.getElementById("content").disabled = true;
    document.getElementById("tone").disabled = true;
    document.getElementById("urgency").disabled = true;
    document.getElementById("length").disabled = true;
    document.getElementById("resultWrapper").style.display = "block";

    document.getElementById("loadingText").style.display = "block";
    document.getElementById("emailResult").innerText = "";


    const emailHistory = document.getElementById("emailHistory").value;
    const title = document.getElementById("title").value;
    const name = document.getElementById("name").value;
    const relation = document.getElementById("relation").value;
    const content = document.getElementById("content").value;
    const tone = document.getElementById("tone").value;
    const urgency = document.getElementById("urgency").value;
    const length = document.getElementById("length").value;
    const model = document.getElementById("model").value;

    //TODO: Validate shit
    
    try {
        const response = await fetch("http://127.0.0.1:8404/api/generateEmail", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "emailHistory": emailHistory,
                "title": title,
                "name": name,
                "relation": relation,
                "content": content,
                "tone": tone,
                "urgency": urgency,
                "length": length,
                "model": model,
            })
        });

        const obj = await response.json()
        console.log(obj.result);
        document.getElementById("loadingText").style.display = "none"
        document.getElementById("emailResult").innerText = obj.result
    } catch (e) {

    }

    document.getElementById("generateEmailButton").disabled = false;
    document.getElementById("newEmail").disabled = false;
    document.getElementById("emailReply").disabled = false;
    document.getElementById("emailHistory").disabled = false;
    document.getElementById("title").disabled = false;
    document.getElementById("name").disabled = false;
    document.getElementById("relation").disabled = false;
    document.getElementById("content").disabled = false;
    document.getElementById("tone").disabled = false;
    document.getElementById("urgency").disabled = false;
    document.getElementById("length").disabled = false;


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
