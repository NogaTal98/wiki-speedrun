# wiki-speedrun
### Huggingface Token
1. Create a huggingface token here: https://huggingface.co/settings/tokens  
2. In **[semantic_modle in line 11](https://github.com/NogaTal98/wiki-speedrun/blob/846f361233fa025a228724a0fe2f5efeea7175c8/semantic_model.py#L11)** change the line to be
```ruby
headers = {"Authorization": "Bearer " + YOUR_TOKEN}
```
where **YOUR_TOKEN** is your generated token from huggingface.

### Run the server
To run the server, run the following command in the terminal
```ruby
flask --app game_flow.py run
```

### Run the game
From the terminal run the folowing command:
```ruby
npm start
```
