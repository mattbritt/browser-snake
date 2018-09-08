# browser-snake
Multiplayer web based snake game.  Built for Beaverhacks Fall 2018. 

Built by the crackpot team browser-snake consisting of Brooks Przybylek, Alex Cheng and Matt Britt.


Todo:
- back end snake code
   done - convert to unit-less (everything in terms of snake segment grid) -- no mo pixels on backend
   done  - timing loop
    - game board class & collision detection
       done - grid with which squares are occupied for quick and easy check of collision
    done - accept direction changes -- arrow keys (could also add WASD for the lefties out there)
    done - 'food' & points & lengthen snake
    done    - snake grow routine
    

- front end snake display code
    done - convert from unit-less (snake segments) to whatever is available for display
    done - emit key events
    done - handle collisions when server detects them

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