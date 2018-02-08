#include <stdlib.h>
#include <stdio.h>

#include <editline/readline.h>

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
