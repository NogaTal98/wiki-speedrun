from scraper import Scraper
from semantic_model import get_semantic_rate

if __name__ == "__main__":
    url = "https://en.wikipedia.org/wiki/Special:Random"
    scraper = Scraper(url)
    print("Random page chosen is: ", scraper.get_page_title())

    desired_word = input("Enter the desired word: ")

    history = []
    for i in range(10):
        page_links_dict = scraper.scrap_page()
        page_links_list = list(page_links_dict.keys())

        semantic_rates = get_semantic_rate(desired_word, page_links_list)
        if isinstance(semantic_rates, str):
            print("ERROR!: " + semantic_rates)
            break

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

        print(max_rated_word, max_rated_url, max_rate)
        url = "https://en.wikipedia.org" + max_rated_url
        scraper = Scraper(url)

        if max_rated_word.lower() == desired_word.lower():
            print("Found the desired word: ", max_rated_word, " after ", i+1, " iterations")
            break
