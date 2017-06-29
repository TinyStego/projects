platform = {}
player = {}

function love.load()
   platform.width = love.graphics.getWidth() / 2
   platform.height = 50
   platform.x  = 0
   platform.y = love.graphics.getHeight() - platform.height

   player.width = 20
   player.height = 50
   player.x = 10
   player.y = 200
   player.speed = 500

   gravity = 350
end

function love.update(dt)
   player.y = player.y + gravity * dt

   if (player.x > platform.x and player.x + player.width < platform.x + platform.width + player.width) and player.y + player.height >= platform.y then
      player.y = platform.y - player.height
   end

   if player.x <= 0 then
      player.x = 0
      player.y = platform.y - player.height
   elseif player.x >= love.graphics.getWidth() - player.width then
      player.x = love.graphics.getWidth() - player.width
   end

   if love.keyboard.isDown("a") then
      player.x = player.x - player.speed * dt
   elseif love.keyboard.isDown("d") then
      player.x = player.x + player.speed * dt
   end
end

function love.draw()
   love.graphics.setColor(255,255,255)
   love.graphics.rectangle("fill", platform.x, platform.y, platform.width, platform.height)
   love.graphics.print(player.x, 20, 10)
   love.graphics.setColor(255,152,15)
   love.graphics.rectangle("fill", player.x, player.y, player.width, player.height)
end
