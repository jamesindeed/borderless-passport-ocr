Install all packages `npm install`

Run `ts-node --esm src/index.ts` to start the server on port 3000

If you don't have ts-node intalled globally you can install it with `npm install -g ts-node`

This is a simple api that returns the passport information from a passport image.

TESTING:

- Once the server is running (`ts-node --esm src/index.ts`) you can naviagte to in your browser http://localhost:3000/extract-passport-info/src/passport.jpg
- You can also test this with Postman by doing a GET request to http://localhost:3000/extract-passport-info/src/passport.jpg
- You can also test this with curl by doing `curl http://localhost:3000/extract-passport-info/src/passport.jpg` in your terminal

Note: The image is stored in the src folder. You can replace it with your own image and change the path in the url to test it with your own image. (e.g. http://localhost:3000/extract-passport-info/src/your-image.jpg)
