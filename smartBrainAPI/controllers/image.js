const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users").where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json("unable to get entries"))
}

const handleAPICall = (req, res) => {
    const { id } = req.body
    const PAT = "81bcb6c30f5e4699bbe3dded6ad8de7e";
    const USER_ID = "ryiuzahn_315";
    const APP_ID = "face-detection";
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": id
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => res.json(result))
        .catch(err => res.status(400).json("unable to fetch"))
}

module.exports = {
    handleImage,
    handleAPICall
}
