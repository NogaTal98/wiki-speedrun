import requests
from bs4 import BeautifulSoup


def exclude(x):
    # check if it is the meta element
    if x.name == "meta":
        return True

    if x.name == "h2" or x.name == "h3" or x.name == "ul" or x.name == "figure":
        return False

    try:
        x_class = x.get("class")
        excluded_list = ["side-box", "navbox", "citation", "reflist", "sidebar"]

        if x_class is None:
            return True
        for excluded in excluded_list:
            if excluded in x_class:
                return False
        return True
    except:
        return True


class Scraper:
    def __init__(self, URL):
        self.page = requests.get(URL)
        self.soup = BeautifulSoup(self.page.content, "html.parser")

    def scrap_page(self):
        job_elements = self.soup.find("div", id="mw-content-text").find("div", class_="mw-content-ltr mw-parser-output")

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
            if link_element.text == "":
                continue
            if link_element.text.startswith("[") and link_element.text.endswith("]"):
                continue
            if "href" in link_element.attrs and link_element["href"].startswith("/wiki/"):
                if ":" in link_element["href"]:
                        continue
                val = link_element["href"]
                key = val.split("/wiki/")[-1].replace("_", " ")
                result_dict[key] = val

            return result_dict

    def get_page_title(self):
        title = self.soup.find("title").text
        return title
