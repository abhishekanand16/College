import re
def draw(s):
    tok = re.findall(r"\(|\)|[^\s()]+", s)

    def build(i):
        i += 1
        kids = []
        while tok[i] != ")":
            if tok[i] == "(":
                kid, i = build(i)
            else:
                kid, i = tok[i], i + 1
            kids.append(kid)
        return kids, i + 1


    class N:
        __slots__ = ("lab", "kids", "x", "y")

        def __init__(self, lab, kids):
            self.lab, self.kids, self.x, self.y = lab, kids, 0, 0

    def wrap(n):
        if isinstance(n, str):
            return N(n, [])
        lab, *ks = n
        return N(lab, [wrap(k) for k in ks])

    root = wrap(build(0)[0])

    def layout(n, col):
        if not n.kids:
            n.y = 0
            n.x = col + len(n.lab) // 2
            return col + len(n.lab) + 2
        c = col
        for k in n.kids:
            c = layout(k, c)
        n.x = (n.kids[0].x + n.kids[-1].x) // 2
        n.y = max(k.y for k in n.kids) + 2
        left = n.x - len(n.lab) // 2
        return max(c, left + len(n.lab) + 2)

    width = layout(root, 2)
    height = root.y + 1
    g = [[" "] * (width + 16) for _ in range(height)]

    def put(r, c, ch):
        if 0 <= r < height and 0 <= c < len(g[r]):
            g[r][c] = ch

    def paint(n):
        r = height - 1 - n.y
        start = n.x - len(n.lab) // 2
        for i, ch in enumerate(n.lab):
            put(r, start + i, ch)
        if not n.kids:
            return
        xs = [k.x for k in n.kids]
        lo, hi = min(xs), max(xs)
        br = r + 1
        for x in range(lo, hi + 1):
            put(br, x, "_")
        put(br, n.x, "|")
        for k in n.kids:
            child_r = height - 1 - k.y
            for rr in range(br + 1, child_r):
                put(rr, k.x, "|")
            paint(k)

    paint(root)
    while g and all(c == " " for c in g[0]):
        g.pop(0)
    for row in g:
        print("".join(row).rstrip())


sent = "i saw the man with the telescope"
trees = [
    "(S (NP i) (VP (VP (V saw) (NP (Det the) (N man))) (PP (P with) (NP (Det the) (N telescope)))))",
    "(S (NP i) (VP (V saw) (NP (NP (Det the) (N man)) (PP (P with) (NP (Det the) (N telescope))))))",
]
meanings = [
    "I used the telescope to see the man.",
    "I saw the man who had the telescope.",
]

print("Sentence:", sent)
print("Parse trees:", len(trees))
for i, (t, m) in enumerate(zip(trees, meanings), 1):
    print(f"\n--- Tree {i} ---")
    draw(t)
    print(f"Meaning: {m}")
