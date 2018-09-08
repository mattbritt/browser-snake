# browser-snake
Multiplayer web based snake game.  Built for Beaverhacks Fall 2018. 

Built by the crackpot team browser-snake consisting of Brooks Przybylek, Alex Cheng and Matt Britt.


Todo:
- back end snake code
    - convert to unit-less (everything in terms of snake segment grid) -- no mo pixels on backend
    - timing loop
    - game board class & collision detection
        - grid with which squares are occupied for quick and easy check of collision
    - accept direction changes -- arrow keys (could also add WASD for the lefties out there)
    - 'food' & points & lengthen snake
        - snake grow routine
    

- front end snake display code
    - convert from unit-less (snake segments) to whatever is available for display
    - emit key events
    - handle collisions when server detects them

    ## Niceties
    - User accounts?
        - could at least get player name
        - store high scores
    - additional items
        - poison food
        - food that is poison for some players and points for others
        - pause or stop the snake?
    - beautify
        - logo