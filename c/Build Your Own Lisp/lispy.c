#include <stdlib.h>
#include <stdio.h>
#include "mpc.h"

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
  //Create some parsers
  mpc_parser_t* Number = mpc_new("number");
  mpc_parser_t* Operator = mpc_new("operator");
  mpc_parser_t* Expression = mpc_new("expr");
  mpc_parser_t* Lispy = mpc_new("lispy");

  //Define them with the following Language
  mpca_lang(MPCA_LANG_DEFAULT,
            "                                                 \
             number  : /-?[0-9]+/;                            \
             operator: '+' | '-' | '*' | '/';                 \
             expr    : <number> | '(' <operator> <expr>+ ')'; \
             lispy   : /^/ <operator> <expr>+ /$/;            \
            ", Number, Operator, Expression, Lispy);

  puts("Lispy Version 0.0.0.0.1");
  puts("Press Ctrl+c to exit.\n");

  while(1)
  {
    //Prompt
    char* input = readline("lispy> ");

    add_history(input);

    //Attempt to parse the user input
    mpc_result_t r;
    if(mpc_parse("<stdin>", input, Lispy, &r))
    {
      //On success print the AST
      mpc_ast_print(r.output);
      mpc_ast_delete(r.output);
    }
    else
    {
      //Print the error
      mpc_err_print(r.error);
      mpc_err_delete(r.error);
    }

    free(input);
  }

  //Undefine and delete parsers
  mpc_cleanup(4, Number, Operator, Expression, Lispy);

  return 0;
}
