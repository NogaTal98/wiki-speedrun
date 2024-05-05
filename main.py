from scraper import scrap_page
from semantic_model import get_semantic_rate

if __name__ == "__main__":
    page_links_dict = scrap_page("https://en.wikipedia.org/wiki/Cantor%27s_theorem")
    page_links_list = list(page_links_dict.keys())
    semantic_rates = get_semantic_rate("digit", page_links_list)
    # get the index of the max rate
    max_rate_index = semantic_rates.index(max(semantic_rates))
    print(page_links_list[max_rate_index])
    print(page_links_dict[page_links_list[max_rate_index]])
    print(max(semantic_rates))
