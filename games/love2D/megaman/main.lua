function love.load()
   r1 = {x=10,y=900,w=50,h=50,vel=300}
   platforms = {{x=0,y=love.graphics.getHeight() - 400,w=love.graphics.getWidth(),h=200}}
   grav = 330
end

function love.update(dt)
   r1.y = r1.y + grav * dt
   for i,v in pairs(platforms) do
      if(collide(r1,v) == "top") then
	 r1.y = v.y - r1.h
      elseif(collide(r1,v) == "bottom") then
	 r1.y = v.y + v.h
      end
   end
   if (love.keyboard.isDown("d")) then
      if (r1.x + r1.w + r1.vel * dt > love.graphics.getWidth()) then r1.x = love.graphics.getWidth() - r1.w end
      r1.x = r1.x + r1.vel * dt
      for i,v in pairs(platforms) do
	 if (collide(r1,v) == "left") then
	    r1.x = v.x - r1.w
	 end
      end
   elseif (love.keyboard.isDown("a")) then
      if (r1.x - r1.vel * dt < 0) then r1.x = 0 end
      r1.x = r1.x - r1.vel * dt
      for i,v in pairs(platforms) do
	 if(collide(r1,v) == "right") then
	    r1.x = v.x + v.w
	 end
      end
   end
end

function love.draw()
   love.graphics.setColor(255,0,0)
   love.graphics.rectangle("fill",r1.x,r1.y,r1.w,r1.h)
   love.graphics.setColor(0,255,0)
   for i,v in pairs(platforms) do
      love.graphics.rectangle("fill",v.x,v.y,v.w,v.h)
   end
   love.graphics.setColor(255,255,255)
   love.graphics.print("Player Y: " .. r1.y, 20, 20)
   love.graphics.print("Platform Y: " .. platforms[1].y, 20, 40)
   love.graphics.print("Collision: " .. collide(r1,platforms[1]), 20, 60)
end

function collide(rec1,rec2)
  dx=(rec1.x+rec1.w/2)-(rec2.x+rec2.w/2)
  dy=(rec1.y+rec1.h/2)-(rec2.y+rec2.h/2)
  width=(rec1.w+rec2.w)/2
  height=(rec1.h+rec2.h)/2
  crossWidth=width*dy
  crossHeight=height*dx
  collision="none"
  
  if(math.abs(dx)<=width and math.abs(dy)<=height) then
     if(crossWidth > crossHeight) then
	collision = (crossWidth > (-crossHeight)) and "bottom" or "left"
     else
	collision = (crossWidth > -(crossHeight)) and "right" or "top"
     end
  end
  return(collision)
end

local clock = os.clock
function sleep(n)  -- seconds
  local t0 = clock()
  while clock() - t0 <= n do end
end
