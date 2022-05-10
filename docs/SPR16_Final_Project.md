# Final Project for CS 361

WRESTLING!! The oldest and greatest sport in the world, where everyone competes one on one, no team mates to blame, no excuses. Defeat is only for the valiant, only for the brave. Only those willing to lose all with honor will truly understand the joy of victory.

We are going to develop a simulation of an entire wrestling season, from start to finish, including a conference tournament with both individual and team champions.

We are modeling a conference of eight schools (100, 200…800) who each are fielding a wrestling team. Each team may have wrestlers in the following weight classes:
(all in pounds) 106, 113, 120, 126, 132, 138, 145, 152, 167, 189, 220, 285.
One wrestler per wt class per school.
The 106 lb wt class goes from 94 to 106,
113 goes from 106+ up to 113
Etc.

Each school will have a random number of wrestlers placed randomly in the list above,
The number of wrestlers: normal dist with mean = 10, std div = 1
Each wrestler, in addition to having a random wt class, will have an ability score with: normal dist mean = 100, std div = 15. Each wrestler will be given an ID number. Members of school 100 will have id’s 101-112, school 200 has id’s 201 to 212 etc. Each wrestler will begin the season with a record of 0 and 0. No wins, no losses.
Match results are computed by:

1. S = higher ability score
   W=weaker ability score
2. Compute diff = S-W 3. Sigma = Std div = diff/3 or fifteen, whichever is greater.
3. Stronger wrestler generates a number with avg = S, sigma 5. Weaker wrestler generates a number with avg = W, sigma

The season consists of a number of dual meets, that is, school vs. school, twice. Every school must compete against all other schools. At the end of the season there will be a tournament.

Tournaments are “seeded”. The goal is to separate the best wresters at the beginning as much as possible. Wrestlers will be seeded according to the following criteria: 1. Head to head results. 2. If the Head to head is circular, that is A beat B who beat C who beat A then
a. Winning percentage is used
b. If Winning percentage is tied then randomly placed
Once the tournament is seeded, it progresses with team points and individual medals.

Wrestling Season Coding Details

1. What are the things?
   a. Conference (may not be needed)
   b. Schools
   c. Teams
   d. Classes
   e. Wrestlers
   f. Records
   g. Match
   h. Season
   i. Tournament

2. What are their attributes?
   a. Conference
   i. Has 8 schools
   ii. Has a schedule
   iii. Has an advantage matrix for each wt class
   b. School
   i. Name (school 200 has wrestlers 201….212)
   ii. Team
   c. Teams
   i. wrestler in an number of wt classes

   d. Wrestlers
   i. Id Numbers
   ii. Ability score
   iii. Records (stored in an advantage matrix, one for each wt class)
   iv. wt class

3. What are their behaviors?

4. What are the data structures?
