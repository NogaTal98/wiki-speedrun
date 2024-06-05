from scraper import Scraper
from semantic_model import get_semantic_rate
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# to run the server, run the following command in the terminal:
# flask --app game_flow.py run


@app.route('/get_next_page', methods=['POST'])
def get_next_page():
    try:
        input_data = request.get_json()
        desired_word = input_data['desired_word']
        url = input_data['url']
        history = input_data['history']

        scraper = Scraper(url)
        page_links_dict = scraper.scrap_page()
        page_links_list = list(page_links_dict.keys())

        if len(history) == 0:
            input_word = scraper.get_page_title()
            history.append({"word": input_word, "url": url, "rate": get_semantic_rate(desired_word, [input_word])[0]})

        if len(page_links_list) == 0:
            return {"error": "No links found in the page"}

        semantic_rates = get_semantic_rate(desired_word, page_links_list)

        if isinstance(semantic_rates, str):
            return {"error": semantic_rates}

        page_links_list = [x for _, x in sorted(zip(semantic_rates, page_links_list), reverse=True)]
        semantic_rates.sort(reverse=True)

        j = 0
        max_rated_word = page_links_list[j]

        history_words = [x["word"] for x in history]
        
        # skip words that are already in the history
        while max_rated_word in history_words and j < len(page_links_list) - 1:
            j += 1
            max_rated_word = page_links_list[j]

        max_rated_url = "https://en.wikipedia.org" +page_links_dict[max_rated_word]
        max_rate = semantic_rates[j]

        history.append({"word": max_rated_word, "url": max_rated_url, "rate": max_rate})

        #next_value = {"max_rated_word": max_rated_word, "url":  max_rated_url, "max_rate": max_rate,"history": history}
        return {"result": history}
    
    except Exception as e:
        return {"error": str(e)}


# def getFullPagesList(page):
#     return True
