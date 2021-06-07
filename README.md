# Candidate Scoring

Use expressjs with mongodb or mysql for this. You need design database tables
yourself based on the question.

a) We have two entities 'candidate' and 'test_score'
b) candidate has properties name, email address
c) Every candidate has to give 3 tests like 'first_round', 'second_round',
'third_round' and scoring for every test is done out of 10.

Now using expressjs, only need to create api to do the following

a) Insert a candidate into database
b) Assign score for a candidate based on the test
c) Get highest scoring candidate and avg scores per round for all candidates
