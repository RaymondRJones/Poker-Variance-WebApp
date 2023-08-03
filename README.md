I used React and Cloudflare to deploy this. It's just a simple calculator with some buttons for user interaction.

Feel free to use this project for whatever you want.

## Purpose of Project
I was inspired by this site https://www.primedope.com/poker-variance-calculator/, but I was disappointed because the site simply simulates a variety of outcomes. Basically, it's limited for analyzing the past.

If you play poker, there's an element of skill that's often shrouded by luck. You don't know if you're the better player at the table, or if you're just lucky. Conversely when you lose money, you don't know if it was due to being unlucky. This calculator solves that problem using statistics.

My math friend helped write a formula for determining the % chance you're a losing poker player, it just needs the # of hands played, the net gains (bb/100), and the standard deviation. This website takes these 3 inputs, runs the formula, and gives you the % chance you're a winning player along with it's 95% confidence interval. Obviously, the more hands you play, the less variance is going to affect your results, and thus, the confidence interval will be better.

## Starting the app
After cloning the project with git, run `npm install` and then `npm start`

