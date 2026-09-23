text="""Natural Language Processing is a branch of Artificial Intelligence.
It enables computers to understand human language.
Natural Language Processing is used in chatbots and virtual assistants.
Machine Learning helps NLP systems learn patterns from Large amount of text.
Deep Learning has improved many NLP applications."""
s=[x.strip() for x in text.split(".") if x.strip()]
w=text.lower().replace(".","").split()
print("Sentences:",s)
print("\nTokens:",w)
sw={"is","a","an","the","it","to","and","in","of","has","from"}
w=[x for x in w if x not in sw]
print("\nStop Words Removed:",w)
stem=lambda x:x[:-3] if x.endswith("ing") else x[:-2] if x.endswith("ed") else x[:-1] if x.endswith("s") else x
print("\nStemming:",[stem(x) for x in w])
lm={"computers":"computer","enables":"enable","chatbots":"chatbot",
"assistants":"assistant","systems":"system","patterns":"pattern",
"applications":"application","helps":"help"}
print("\nLemmatization:",[lm.get(x,x) for x in w])
v={"enable","enables","helps","learn","improved","understand"}
print("\nPOS:",[(x,"VERB" if x in v else "NOUN") for x in w])
voc=sorted(set(w))
print("\nVocabulary:",voc)
for i,x in enumerate(s,1):
    x=[z for z in x.lower().replace(".","").split() if z not in sw]
    print("Sentence",i,":",[x.count(z) for z in voc])