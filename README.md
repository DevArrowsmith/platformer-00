# Platformer 00
https://gummicode.github.io/platformer-00/

## Introduction
This app is a small browser-based platform game powered by a JavaScript event loop, with object styling and rendering controlled using CSS & HTML.

The project began as an implementation of [this tutorial](https://www.educative.io/edpresso/how-to-make-a-simple-platformer-using-javascript), then grew as I designed and implemented additional elements:
- A more advanced platform generation algorithm
- Moving enemies with collision detection
- A goal (also with collision detection)
- Conditional events on enemy impact, on falling and on completion of a level
- A pretty fireworks animation when the player wins

## Aims
- Create a platformer
- Use an event loop to create a continuously responsive interface
- Practice conditional code
- Familiarise myself with JavaScript, HTML and CSS in an unfamiliar context.

## Running the App
The app is hosted on GitHub pages. It can be accessed at https://gummicode.github.io/platformer-00/

The app can also be run locally:
1. [Clone the app onto your device.](https://docs.github.com/en/enterprise/2.13/user/articles/cloning-a-repository)
2. Navigate to index.html within the directory. Open this within a browser.

## Using the App
Click on the browser window to put it into focus, then use the arrow keys to navigate the player (orange square) to the goal (between the green markers.
- Jump: Up key
- Left/Right: Left/right/arrows

## Next Steps
- The app doesn't work on mobile devices. it could be rescaled with media queries to permit this. I'm not sure how to add touch controls to a game, but I can find out!
- It would be nice to add some extra graphics that show on key events, like falling and enemy collisions.
- Add a tracker that shows how many wins and losses you've had.
