import requests
from bs4 import BeautifulSoup


def exclude(x):
    # check if it is the meta element
    if x.name == "meta":
        return True

    if x.name == "h2" or x.name == "ul" or x.name == "figure":
        return False

    try:
        x_class = x.get("class")
        excluded_list = ["side-box", "navbox", "citation", "reflist"]

        if x_class is None:
            return True
        for excluded in excluded_list:
            if excluded in x_class:
                return False
        return True
    except:
        return True

def scrap_page(URL: str):
    # URL = "https://en.wikipedia.org/wiki/Cantor%27s_theorem"
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")

    job_elements = soup.find("div", id="mw-content-text").find("div", class_="mw-content-ltr mw-parser-output")

    elements_to_search = []
    for relevant_element in job_elements:
        if relevant_element.name == "meta":
            elements_to_search += relevant_element.children
        else:
            elements_to_search.append(relevant_element)

    relevant_elements = list(filter(lambda x: exclude(x), elements_to_search))

    link_elements = []
    for relevant_element in relevant_elements:
        if relevant_element.name == "a":
            link_elements.append(relevant_element)
        else:
            try:
                link_elements += relevant_element.find_all("a")
            except:
                pass

    result_dict = {}
    for link_element in link_elements:
        if link_element.text.startswith("[") and link_element.text.endswith("]"):
            continue
        if "href" in link_element.attrs:
            result_dict[link_element.text] = link_element["href"]

    return result_dict
