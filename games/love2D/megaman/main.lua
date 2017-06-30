platform = {width=love.graphics.getWidth() / 2, height=200, x=100, y=love.graphics.getHeight() - 200}
player = {width=20, height=50, x=200, y=200, speed=250}
bullets = {}
up = true

function love.load()
   gravity = 350
   love.graphics.setBackgroundColor(50,200,150)
end

function love.update(dt)
   player.y = player.y + gravity * dt

   if (player.x > platform.x - player.width and player.x + player.width < platform.x + platform.width + player.width)
   and (player.y + player.height >= platform.y and player.y < platform.y) then
      player.y = platform.y - player.height
   end

   if player.x <= 0 or (player.x <= 0 and love.keyboard.isDown("a")) then
      player.x = 0
      player.speed = 0
   elseif player.x >= love.graphics.getWidth() - player.width then
      player.x = love.graphics.getWidth() - player.width
   end

   local i,o
   for i,o in ipairs(bullets) do
      o.x = o.x + o.speed * dt
      if (o.x < -10) or (o.x > love.graphics.getWidth() + 10) then table.remove(bullets, i) end
   end
   
   if love.keyboard.isDown("a") then player.x = player.x - player.speed * dt
   elseif love.keyboard.isDown("d") then player.x = player.x + player.speed * dt end

   if love.keyboard.isDown("p") and up == true then
      table.insert(bullets, {x=player.x + player.width, y=player.y + (player.height / 2), speed=400})
      up = false
   end

   if not love.keyboard.isDown("p") then up = true end
end

function love.draw()
   love.graphics.setColor(255,255,255)
   love.graphics.rectangle("fill", platform.x, platform.y, platform.width, platform.height)
   love.graphics.setColor(255,152,15)
   love.graphics.rectangle("fill", player.x, player.y, player.width, player.height)

   local i,o
   for i,o in ipairs(bullets) do love.graphics.circle("fill", o.x, o.y, 10, 8) end
end
