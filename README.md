# Planet Ark

Standard node.js tooling front end project.
Sorry it is not react or something more fancy but I hope it is just as fit for
purpose.

For best results, use node.js 8.0.0 or later.
That's what I've used for development.

There is no server side/back-end component.
I've made it so that it can be used with any back end infrastructure.
It is just a bunch of (code generated) static html files that can be served
up through any html server.
Although, if you wish to implement the postcard feature, as pert the latest
designs, a server side component might become necessary.
Might be able to do a serverless thing with AWS or something.
However I'd be careful as any kind of server email sending feature is easy
to abuse and should ideally be wrapped around with something like reCAPTCHA.

Run build.bash to to build the client files (in docs folder).
If you don't have bash, that is also fine.
All the tools are more or less platform independent.
If you just run the commands in the bash file, should be able to get going.

Everything is bult up on open source, royalty free software.
This source code is obviously placed in a open source repository.
We hope that subsequent iterations of this software are also be kept open
source.
So that if someone else has the same need, they could just grab it and use it
for a future event.

Output is put in docs folder.
I suppose that name is not very intuitive.
That name is used for no other reason than github pages hosting as there is
an option in github settings to just publish the hardcoded "docs" folder
as github pages for a repository.
Don't ask me why it is not customisable.

## General Strategy & organisation

Uses code generation to produce static files that can be served from any
http server.
Source code for code generation is a simple node script (generate.js).
Ended up code generating instead doing a dynamic ajax piece as a lot of
social media sites use static open graph protocol meta tags to relate
content.

There is a bit of client side dynamic content (javascript; source in
js/index.js) which takes care of navigation (using push state);
social links etc.
It is a very minor piece with no dependencies on jquery or anything.
If you need to, you can just use d3 (const d3 = require("d3-selection")
etc.) which is already in the dependency tree but is not included.
I have't bothered using it as the requirements for the project is very
simple.

Content data is in js/images.js.

Stylesheet is done in scss/sass (in scss folder).

Static images and stuff are put in static folder.

Tried to use basic html5 for everything.
Browsers that don't support this year, I guess, are no longer supported by
their browser vendors.
So they should upgrade, for security reasons too.

## Build

### For release

    npm install
    bash build.bash

serve up the docs folder

### For development

You can do npm run watch for continuous development.
Will need to rerun generate.js if you modify code generation or data.
Serve up docs folder with your favourite http server.
