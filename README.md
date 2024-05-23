# wiki-speedrun
**live demo:** https://wiki-speedrun.web.app/
## Description
AI agent that, by providing any wikipedia page and any desired word, find a hyperlink path starting from this wikipedia page to the wikipedia page of the provided word.    
This agent is mimicking the famous [wikipedia game](https://en.wikipedia.org/wiki/Wikipedia:Wiki_Game).  
It uses a [semantic embedding model](https://api-inference.huggingface.co/models/SeyedAli/Multilingual-Text-Semantic-Search-Siamese-BERT-V1) from huggingface, and scraping the wikipedia pages.

## Get Started
### Huggingface Token
1. Create a huggingface token here: https://huggingface.co/settings/tokens  
2. In [semantic_modle in line 11](https://github.com/NogaTal98/wiki-speedrun/blob/846f361233fa025a228724a0fe2f5efeea7175c8/semantic_model.py#L11) change the line to be
```python
headers = {"Authorization": "Bearer " + YOUR_TOKEN}
```
where **YOUR_TOKEN** is your generated token from huggingface.

### Run the server
To run the server, run the following command in the terminal
```bash
flask --app game_flow.py run
```

### Run the frontend
From the terminal run the following command:
```bash
npm start
```
