platform = {width=love.graphics.getWidth() / 2, height=200, x=200,
y=love.graphics.getHeight() / 2 - 100} player = {width=20, height=50, x=20, y=20, speed=250} bullets = {} up = true

function love.load()
--   gravity = 350
   love.graphics.setBackgroundColor(50,200,150)
end

function love.update(dt)
   --   player.y = player.y + gravity * dt

   --/* Make the bullets move right all the time(doesn't matter cause they're not always on the screen),
   -- then delete the bullets when they leave the screen
   local i,o
   for i,o in ipairs(bullets) do
      o.x = o.x + o.speed * dt
      if (o.x < -10) or (o.x > love.graphics.getWidth() + 10) then table.remove(bullets, i) end
   end
   --*/

   --*/ Check on the horizontal axis if the player will collide with the platform/edge BEFORE the player moves,
   -- if so, snap the player to that edge without moving them further, if not, move normally
   if love.keyboard.isDown("d") then
      if (player.x + player.width + (player.speed * dt) > platform.x and player.x <= platform.x)
	and ((player.y > platform.y and player.y < platform.y + platform.height)
	or (player.y + player.height > platform.y and player.y + player.height < platform.y + platform.height)) then
	 player.x = platform.x - player.width
      elseif (player.x + player.width + (player.speed * dt) >= love.graphics.getWidth()) then
	 player.x = love.graphics.getWidth() - player.width
      else
	 player.x = player.x + player.speed * dt
      end
   elseif love.keyboard.isDown("a") then
      if (player.x - (player.speed * dt) < platform.x + platform.width and player.x + player.width >= platform.x + platform.width)
	and ((player.y > platform.y and player.y < platform.y + platform.height)
	or (player.y + player.height > platform.y and player.y + player.height < platform.y + platform.height)) then
	 player.x = platform.x + platform.width
      elseif (player.x - (player.speed * dt) <= 0) then
	 player.x = 0
      else
	 player.x = player.x - player.speed * dt
      end
   end
   --*/
   
   --/* Check on the vertical axis if the player will collide with the platform/edge BEFORE the player moves,
   -- if so, snap the player to that edge without moving them further, if not, move normally
   if love.keyboard.isDown("w") then
      if (player.x >= platform.x - player.width
	     and player.x + player.width <= platform.x + platform.width + player.width - 5)
      and (player.y - (player.speed * dt) <= platform.y + platform.height and player.y + player.height >= platform.y + platform.height) then
	 player.y = platform.y + platform.height
      elseif (player.y - (player.speed * dt) <= 0) then
	 player.y = 0
      else
	 player.y = player.y - player.speed * dt
      end
   elseif love.keyboard.isDown("s") then
      if (player.x >= platform.x - player.width
	     and player.x + player.width <= platform.x + platform.width + player.width - 5)
      and (player.y + player.height + (player.speed * dt) >= platform.y and player.y <= platform.y) then
	 player.y = platform.y - player.height
      elseif (player.y + player.height + (player.speed * dt) >= love.graphics.getHeight()) then
	 player.y = love.graphics.getHeight() - player.height
      else
	 player.y = player.y + player.speed * dt
      end
   end
   --*/

   --/* Create a bullet in the bullet table with some initial values when "p" is pressed,
   -- also, check to see if the player has let go  of the button, only allow bullet creation
   -- once per key down
   if love.keyboard.isDown("p") and up == true then
      table.insert(bullets, {x=player.x + player.width, y=player.y + (player.height / 2), speed=400})
      up = false
   end
   --*/

   --/* Set the up value to true if the player release "p" to reset the value and allow the player to shoot
   if not love.keyboard.isDown("p") then up = true end
   --*/
end

function love.draw()
   love.graphics.setColor(255,255,255)
   love.graphics.rectangle("fill", platform.x, platform.y, platform.width, platform.height)
   love.graphics.setColor(255,152,15)
   love.graphics.rectangle("fill", player.x, player.y, player.width, player.height)

   --/* Draw each bullet as it is created(loop through the table)
   local i,o
   for i,o in ipairs(bullets) do love.graphics.circle("fill", o.x, o.y, 10, 8) end
   --*/
end
