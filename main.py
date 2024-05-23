import requests

from game_flow import get_next_page
from scraper import Scraper
from semantic_model import get_semantic_rate

if __name__ == "__main__":
    url = "https://en.wikipedia.org/wiki/Special:Random"
    # scraper = Scraper(url)
    # print("Random page chosen is: ", scraper.get_page_title())

    desired_word = input("Enter the desired word: ")

    input_data = {
        "desired_word": desired_word,
        "url": url,
        "history": []
    }

    for i in range(50):
        res = requests.post("http://NogaTal.pythonanywhere.com/get_next_page", json=input_data)

        if res.status_code != 200:
            print("Error: ", res.reason)
            break

        next_word = res.json()["max_rated_word"]
        next_url = res.json()["url"]
        max_rate = res.json()["max_rate"]
        history = res.json()["history"]

        print(next_word, next_url, max_rate)

        input_data = {
            "desired_word": desired_word,
            "url": next_url,
            "history": history
        }

        if next_word.lower() == desired_word.lower():
            print("Found the desired word: ", next_word, " after ", i+1, " iterations")
            break
