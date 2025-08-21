async function enhanceText() {
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

    } catch (e) {
        //document.writeln("You are cooked")
    }

    document.getElementById("enhanceButton").disabled = false;


}

async function reset() {

}