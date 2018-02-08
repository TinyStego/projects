#include <stdlib.h>
#include <stdio.h>

//If we are working on Windows we will add these functions
//instead of using editline
#ifdef _WIN32
#include <string.h>

static char buffer[2048];

//Allocate some memory of the buffer size then copy the buffer
//to that address and return the copy
char* readline(char* prompt)
{
  fputs(prompt, stdout);
  fgets(buffer, 2048, stdin);

  char* cpy = malloc(strlen(buffer) + 1);
  strcpy(cpy, buffer);
  cpy[strlen(cpy) - 1] = '\0';

  return cpy;
}

//Fake add_history function
void add_history(char* unused);

//Use editline if working on Linux or Mac
#else
#include <editline/readline.h>
#endif

int main(int argc, char** argv)
{
  puts("Lispy Version 0.0.0.0.1");
  puts("Press Ctrl+c to exit.\n");

  while(1)
  {
    //Prompt
    char* input = readline("lispy> ");

    add_history(input);

    printf("%s\n", input);

    free(input);
  }

  return 0;
}
