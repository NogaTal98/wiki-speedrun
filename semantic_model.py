import requests
import os
from dotenv import load_dotenv

load_dotenv()


def get_semantic_rate(word: str, words_arr: list[str]):
    API_URL = "https://api-inference.huggingface.co/models/SeyedAli/Multilingual-Text-Semantic-Search-Siamese-BERT-V1"
    headers = {"Authorization": "Bearer " + os.getenv("HUGGINGFACE_TOKEN")}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    output = None
    for i in range(2):
        output = query({
            "inputs": {
                "source_sentence": word,
                "sentences": words_arr
            },
        })
        if isinstance(output, list):
            return output
        print("Could not get a response, trying again...")

    if isinstance(output, dict):
        return output["error"]

    return output