function love.load()
   r1 = {x=10,y=10,w=50,h=50,vel=200}
   platforms = {r2 = {x=100,y=100,w=200,h=25}, r3 = {x=400,y=50,w=200,h=100}, r4 = {x=25,y=150,w=30,h=200}}
end

function love.update(dt)
   if (love.keyboard.isDown("d")) then
      r1.x = r1.x + r1.vel * dt
      for i,v in pairs(platforms) do
	 if (collide(r1,v) == "left") then
	    r1.x = v.x - r1.w
	 end
      end
   elseif (love.keyboard.isDown("a")) then
      r1.x = r1.x - r1.vel * dt
      for i,v in pairs(platforms) do
	 if(collide(r1,v) == "right") then
	    r1.x = v.x + v.w
	 end
      end
   end
   if(love.keyboard.isDown("w")) then
      r1.y = r1.y - r1.vel * dt
      for i,v in pairs(platforms) do
	 if(collide(r1,v) == "bottom") then
	    r1.y = v.y + v.h
	 end
      end
   elseif(love.keyboard.isDown("s")) then
      r1.y = r1.y + r1.vel * dt
      for i,v in pairs(platforms) do
	 if(collide(r1,v) == "top") then
	    r1.y = v.y - r1.h
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

