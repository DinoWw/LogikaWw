# LogikaWw
Updated repository for github.com/DinoWw/LogikaWw_old, now containing only the relevant code
Code which allows the validation of logic conclusions. Currently hosted [here](https://netwwork.duckdns.org/LogikaWw).
Please report bugs on the 'issues' tab of this gitHub page

# Elements
### left side - the logic tree
- starts with one root asumption, the first line
- every line is one expression
- expressions above short horizontal lines are assumptions, always considered correct
- to the right of every line lays reasoning as to why that line is correct under assumptions
- color of an expression tells you if your conclusion is valid
- the cursor
  - there are arrows above and to the left of the tree to tell you where the cursor is postitioned
  - you can move it using the buttons like \[v] and \[>]

### right side - buttons
- columns from *right to left*:
  - operators and quantifiers
  - predicates
  - constants
  - reasonings
  - source lines
  - miscellaneous
 

### expressions
- elements of the logic tree
- inputed using buttons in preorder (see [examples](#examples))

### validation
- runs automatically
- all green lines means everything is correctly concluded

# Examples
### Prove that from A and B follows A
A^B -> A
What buttons to press in what order?
You first need to set the first assumption. The cursor is positioned correctly. Turning A^B into preorder: ^AB. Always operator then predicates. Pressing button **^**, the first line in the tree now looks like __^__. Now every nex expression tyou input will always fill the leftmost blank space. So you can press **A** to input the predicate A left of the ^ operator, and then **B** for the next blank. The first line is always an assumption so we do not need to press **u. p.** (uvodenje pretpostavke) which we usually should.  As there are no more blanks in the current line, after you start to enter the next expression the cursor will drop one line below. For the next line, you can press **A**. Right now, the A on line 2 is red. You need to press **i. ^** (iskljucivanje konjunkcije) followed by the line number of the expression from which the current one follows - 1. If all was done correctly, the second line is now green meaning our thesis of "from A and B follows A" is correct.

### From ((From A follows B) and (not B)) follows (not A)
```
^, ->, A, B, -, B
->, A, B, i. ^, 1
-, B, i. ^, 1
A, u. p.
B, i. ->, 2, 4
contradiction (upside-down T), u. contradiciton, 3, 5
press the left arrow to exit the assumption that A
-, A, u. -, 4, 6
```

![image](https://github.com/user-attachments/assets/af2f477a-a991-46a7-bf8d-32116be95326)


### TODO: add quantifier example
Feel free to contact me using contact info in my github profile if you want to learn more about the software.


