#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <stdio.h>
#include <string>

const int SCREEN_WIDTH = 1024;
const int SCREEN_HEIGHT = 768;

SDL_Window* gWindow = NULL;
SDL_Surface* gScreenSurface = NULL;
SDL_Renderer* gRenderer = NULL;
SDL_Texture* gTexture = NULL;

bool init();
bool loadMedia();
void close();
SDL_Texture* loadTexture(std::string path);

int main(int argc, char* args[])
{
  if(!init())
  {
    printf("Failed to initialize!");
  }
  else
  {
    if(!loadMedia())
    {
      printf("Failed to load Media!\n");
    }
    else
    {
      bool quit = false;
      SDL_Event e;

      while(!quit)
      {
        while(SDL_PollEvent(&e) != 0)
        {
          if(e.type == SDL_QUIT)
          {
            quit = true;
          }
        }

        SDL_SetRenderDrawColor(gRenderer, 0xDD, 0xDD, 0xDD, 0xDD);
        SDL_RenderClear(gRenderer);

        SDL_Rect fillRect = {SCREEN_WIDTH / 4, SCREEN_HEIGHT / 4,
                             SCREEN_WIDTH / 2, SCREEN_WIDTH / 2};
        SDL_SetRenderDrawColor(gRenderer, 255, 0, 0, 0);
        SDL_RenderFillRect(gRenderer, &fillRect);

        SDL_Rect outlineRect = {SCREEN_WIDTH / 6, SCREEN_HEIGHT / 6,
                                SCREEN_WIDTH * 2/3, SCREEN_HEIGHT * 2/3};
        SDL_SetRenderDrawColor(gRenderer, 0, 255, 255, 255);
        SDL_RenderDrawRect(gRenderer, &outlineRect);

        SDL_SetRenderDrawColor(gRenderer, 0x00, 0x00, 0xFF, 0xFF);
        SDL_RenderDrawLine(gRenderer, 0, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT / 2);

        SDL_SetRenderDrawColor(gRenderer, 0xFF, 0xFF, 0x00, 0xFF);
        for(int i = 0; i < SCREEN_HEIGHT; i += 4)
        {
          SDL_RenderDrawPoint(gRenderer, SCREEN_WIDTH / 2, i);
        }

        SDL_RenderPresent(gRenderer);
      }
    }
  }
}

bool init()
{
  bool success = true;

  if(SDL_Init(SDL_INIT_VIDEO) < 0)
  {
    printf("SDL could not initialize! SDL Error: %s\n", SDL_GetError());
    success = false;
  }
  else
  {
    gWindow = SDL_CreateWindow("SDL", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOW_SHOWN,
                               SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if(gWindow == NULL)
    {
      printf("Window could not be created! SDL Error: %s\n", SDL_GetError());
      success = false;
    }
    else
    {
      gRenderer = SDL_CreateRenderer(gWindow, -1, SDL_RENDERER_ACCELERATED);
      if(gRenderer == NULL)
      {
        printf("Renderer could not be created! SDL Error: %s\n", SDL_GetError());
        success = false;
      }
    }
  }

  return success;
}

bool loadMedia()
{
  bool success = true;

  return success;
}

void close()
{
  SDL_DestroyTexture(gTexture);
  gTexture = NULL;

  SDL_DestroyRenderer(gRenderer);
  SDL_DestroyWindow(gWindow);
  gWindow = NULL;
  gRenderer = NULL;

  SDL_Quit();
  IMG_Quit();
}

SDL_Texture* loadTexture(std::string path)
{
  SDL_Texture* newTexture = NULL;

  SDL_Surface* loadedSurface = IMG_Load(path.c_str());
  if(loadedSurface == NULL)
  {
    printf("Unable to load image %s! SDL_image Error: %s\n", path.c_str(), IMG_GetError());
  }
  else
  {
    newTexture = SDL_CreateTextureFromSurface(gRenderer, loadedSurface);
    if(newTexture == NULL)
    {
      printf("Unable to create texture from %s! SDL Error: %s\n", path.c_str(), SDL_GetError());
    }

    SDL_FreeSurface(loadedSurface);
  }

  return newTexture;
}
