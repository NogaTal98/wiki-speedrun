from scraper import Scraper
from semantic_model import get_semantic_rate
from flask import Flask, request

app = Flask(__name__)

# to run the server, run the following command in the terminal:
# flask --app game_flow.py run


@app.route('/get_next_page', methods=['POST'])
def get_next_page():
    input_data = request.get_json()
    desired_word = input_data['desired_word']
    url = input_data['url']
    history = input_data['history']

    scraper = Scraper(url)
    page_links_dict = scraper.scrap_page()
    page_links_list = list(page_links_dict.keys())

    semantic_rates = get_semantic_rate(desired_word, page_links_list)

    page_links_list = [x for _, x in sorted(zip(semantic_rates, page_links_list), reverse=True)]
    semantic_rates.sort(reverse=True)

    j = 0
    max_rated_word = page_links_list[j]
    while max_rated_word in history and j < len(page_links_list) - 1:
        j += 1
        max_rated_word = page_links_list[j]
    max_rated_url = page_links_dict[page_links_list[j]]
    max_rate = semantic_rates[j]

    history.append(max_rated_word)

    url = "https://en.wikipedia.org" + max_rated_url

    next_value = {"max_rated_word": max_rated_word, "url":  url, "max_rate": max_rate,"history": history}
    return next_value

# def getFullPagesList(page):
#     return True
