# NOTES BY NERD

## This is are the bs notes i've been takinn for myself

---

### LLM Settings

- **Temperature**
  Controls randomness.

  - `0` → deterministic, boring
  - `0.7` → balanced
  - `1.2+` → chaotic

- **top_p (Nucleus Sampling)**
  Instead of picking from all tokens, the model picks only from the top X% probability.

  - `1` = no restriction
  - `0.9` = picks higher-confidence tokens first
    **Works with or instead of temperature**

- **top_k**
  Limits how many top tokens are considered.
  Example: `top_k = 50` → model only considers the best 50 possible next words.

- **stop / stop_sequences**
  Stops the model when it hits specific text.
  Example:

  ```md
  stop: ["dickhead"]
  ```

- **max_tokens**
  Maximum tokens the model can generate in the response

- **frequency_penalty**
  If the model keeps repeating same words, increase this. (1 or 1.2)

- **presence penalty**
  - Punishes tokens if they already appeared in the text.
  - frequency penalty punsihes more as word loops increases, presence penalty from start acting single first loop\
  - Encourages the model to introduce new topics rather than staying on the same one.

---

**There are more like**

```
seed – deterministic output
tools/function_call – call structured functions
stream – streaming responses
response_format – enforce JSON/XML etc
logit_bias – force/include/ban words
safety_settings – content filters
system/user messages – chat structure

```

**Use instructor library and zod validation to generate a particular o/p**
