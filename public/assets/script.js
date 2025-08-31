async function enhanceText() {

    const text = document.getElementById("before").value
    const model = document.getElementById("model").value
    const mode = document.getElementById("mode").value


    if(text == ""){
        showToast("Please provide a text.");
        return;
    }

    document.getElementById("loadingText").style.display = "block"
    document.getElementById("textArea").style.display = "none"
    document.getElementById("enhanceButton").disabled = true;
    removeAllChildNodes(document.getElementById("after"))
    document.getElementById("hiddenResultOnly").innerText = "";

    try {
        const response = await fetch(`api/enhanceText`, {
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
        if (mode == 0) {
            //const [highlightedText1, highlightedText2] = compareAndHighlight(text1, text2);
            //document.getElementById("after").innerHTML = highlightedText2;

            let span = null;

            const diff = Diff.diffWords(text1, text2),
                display = document.getElementById('after'),
                fragment = document.createDocumentFragment();

            diff.forEach((part) => {
                const classes = part.added ? 'text-success' :
                    part.removed ? 'text-danger' : '';

                span = document.createElement('span');

                if (classes) {
                    span.className = classes;
                    if(classes == "text-success")
                        span.style.fontWeight = "700";
                    if(classes == "text-danger")
                        span.style.textDecoration = "line-through";
                }
                span.appendChild(document
                    .createTextNode(part.value));
                fragment.appendChild(span);
            });

            display.appendChild(fragment);
            document.getElementById("hiddenResultOnly").innerText = text2;
        } else {
            document.getElementById("after").innerText = text2;
            document.getElementById("hiddenResultOnly").innerText = text2;
        }

    } catch (e) {
        // punish user for error
        document.writeln("The app crashed. You've done something wrong")
    }

    document.getElementById("enhanceButton").disabled = false;
    document.getElementById("loadingText").style.display = "none"
    document.getElementById("textArea").style.display = "block"
    document.getElementById("resultOptions").style.display = "block"


}

function enableThingsEnhanceText(){
    document.getElementById("enhanceButton").disabled = false;
    document.getElementById("loadingText").style.display = "none"
    document.getElementById("textArea").style.display = "block"
    document.getElementById("resultOptions").style.display = "block"

}
function disableThingsEnhanceText(){
    document.getElementById("loadingText").style.display = "block"
    document.getElementById("textArea").style.display = "none"
    document.getElementById("enhanceButton").disabled = true;
    removeAllChildNodes(document.getElementById("after"))
    document.getElementById("hiddenResultOnly").innerText = "";

}

function copyText(){
    const textField = document.getElementById("hiddenResultOnly");
    const textToCopy = textField.innerText;
    navigator.clipboard.writeText(textToCopy);
    showToastSuccess("The text has been copied to your clipboard")
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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

function showToast(message) {
    const toastLiveExample = document.getElementById('liveToastDanger');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    document.getElementById('liveToastDangerBody').innerText = message;
    toastBootstrap.show();
}

function showToastSuccess(message) {
    const toastLiveExample = document.getElementById('liveToastSuccess');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    document.getElementById('liveToastSuccessBody').innerText = message;
    toastBootstrap.show();
}



async function generateEmail() {

    const emailHistory = document.getElementById("emailHistory").value;
    const title = document.getElementById("title").value;
    const name = document.getElementById("name").value;
    const relation = document.getElementById("relation").value;
    const content = document.getElementById("content").value;
    const tone = document.getElementById("tone").value;
    const urgency = document.getElementById("urgency").value;
    const length = document.getElementById("length").value;
    const model = document.getElementById("model").value;
    const language = document.getElementById("language").value;

    // Helper function to check if a value is null or empty
    function isEmpty(value) {
        return value === null || value === "";
    }

    //if (isEmpty(title)) {
    //    showToast("Please provide a title.");
    //    return;
    //}

    if (isEmpty(name)) {
        showToast("Please provide a name.");
        return;
    }

    if (isEmpty(relation)) {
        showToast("Please specify the relationship.");
        return;
    }

    if (isEmpty(content)) {
        showToast("Please provide the content.");
        return;
    }

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
    document.getElementById("language").disabled = true;
    document.getElementById("resultWrapper").style.display = "none";

    document.getElementById("loadingText").style.display = "block";
    document.getElementById("emailResult").innerText = "";

    //TODO: Validate shit

    try {
        const response = await fetch(`api/generateEmail`, {
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
                "language": language
            })
        });

        const obj = await response.json()
        console.log(obj.result);
        document.getElementById("resultWrapper").style.display = "block";
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
    document.getElementById("language").disabled = false;


}

async function reset() {

}

// Legacy function, AI generated.
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
                resultHtml1 += `<span class="text-success" style="font-weight: 700">${word1}</span> `;
            }
            if (word2 !== '') {
                resultHtml2 += `<span class="text-success" style="font-weight: 700">${word2}</span> `;
            }
        }
    }
    // Trim any trailing space
    return [resultHtml1.trim(), resultHtml2.trim()];
}
