This repo is for controlling Parrot Bebop with xbox one controller and nodejs using a Mac os.

- First install cylon-bebop (https://github.com/hybridgroup/cylon-bebop) and cylon-joystick (https://github.com/hybridgroup/cylon-joystick)
   npm install cylon-bebop
   npm install cylon-joystick
- Install the Xbox One Driver for mac os (https://github.com/360Controller/360Controller/releases) and configure it in System Preferences >> Xbox 360 controllers
- Download the file <a href="https://github.com/jijid13/xboxonebebop/blob/master/xbox_360.json">xbox_360.json</a> and copy it in your local_folder/node_modules/cylon-joystick/lib/config/xbox_360.json 
- In console mode after connecting your controller, start the program cylon-joystick-explorer, then copy the Vendor ID, product ID and the decription in the downloaded file xbox_360.json if different. 
- Donwload the file xbox1bebop.js
- Connect to the Bebop wifi, connect your Xbox One Controller and start the file xbox1bebop.js
   node xbox1bebop.js

Features :
  - left joystick : forward, backward, fly right and fly left
  - right joystick : up, down, rotate right and rotate left
  - left trigger : land
  - right trigger : take off       
  - left bumper button : Stop drone
  - right bumper button : Emergency
  - Y front flip
  - A back flip
  - X left flip
  - B right flip

it should work !


To get video stream try this tuto maybe it will work for you.
http://developer.parrot.com/blog/2016/play-bebop-stream-on-vlc/
