from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)


completion = client.chat.completions.create(
  model="meta/llama-3.1-8b-instruct",
  messages=[{"role":"user","content":"Write a limerick about the wonders of GPU computing."}],
  temperature=0.2,
  top_p=0.7,
  max_tokens=1024,
  stream=True
)


