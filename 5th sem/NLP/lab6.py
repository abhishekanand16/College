corpus = [
    "the boys are playing football",
    "the girls are playing football yestarday",
    "the boys played football everyday",
    "the players are playing on the ground"
]
stop_words = {"the", "are", "on"}
morphology = {
    "boys": ("boy", "-s"),
    "girls": ("girl", "-s"),
    "playing": ("play", "-ing"),
    "played": ("play", "-ed"),
    "players": ("play", "-er, -s")
}

print(f"{'Word':<12}{'Stop Word':<12}{'Root':<12}{'Affix':<12}")
print("-" * 48)

for sentence in corpus:
    tokens = sentence.lower().split()

    for word in tokens:
        if word in stop_words:
            root, affix = "-", "-"
            stop = "Yes"
        else:
            stop = "No"
            root, affix = morphology.get(word, (word, "-"))

        print(f"{word:<12}{stop:<12}{root:<12}{affix:<12}")