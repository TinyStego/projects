#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <editline/readline.h>
#include "mpc.h"

#define max(a,b) \
  ({__typeof__ (a) _a = (a); \
    __typeof__ (b) _b = (b); \
    _a > _b ? _a : _b;})

#define min(a,b) \
  ({__typeof__ (a) _a = (a); \
    __typeof__ (b) _b = (b); \
    _a < _b ? _a : _b;})

//Create enum of possible lval types
enum{LVAL_NUM, LVAL_ERR};
//Create enum of possible error types
enum{LERR_DIV_ZERO, LERR_BAD_OP, LERR_BAD_NUM};

typedef struct
{
  int type;
  long num;
  int err;
} lval;

//Create a new number type lval
lval lval_num(long x)
{
  lval v;
  v.type = LVAL_NUM;
  v.num = x;
  return v;
}

//Create a new error type lval
lval lval_err(int x)
{
  lval v;
  v.type = LVAL_ERR;
  v.err = x;
  return v;
}

lval eval(mpc_ast_t* t);
lval eval_op(lval x, char* op, lval y);

//Print an lval
void lval_print(lval v);
//Print an lval with a newline
void lval_println(lval v){lval_print(v); putchar('\n');}

int main(int argc, char** argv)
{
  //Create some parsers
  mpc_parser_t* Number = mpc_new("number");
  mpc_parser_t* Operator = mpc_new("operator");
  mpc_parser_t* Expression = mpc_new("expr");
  mpc_parser_t* Lispy = mpc_new("lispy");

  //Define them with the following Language
  mpca_lang(MPCA_LANG_DEFAULT,
            "                                                                 \
             number  : /-?[0-9]+/;                                            \
             operator: '+' | '-' | '*' | '/' | '%' | '^' | \"min\" | \"max\";  \
             expr    : <number> | '(' <operator> <expr>+ ')';                 \
             lispy   : /^/ <operator> <expr>+ /$/;                            \
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
      lval result = eval(r.output);
      lval_println(result);
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

lval eval(mpc_ast_t* t)
{
  //If tagged as a number return it directly
  if(strstr(t->tag, "number"))
  {
    //Check if there is some error in coversion
    errno = 0;
    long x = strtol(t->contents, NULL, 10);
    return errno != ERANGE ? lval_num(x) : lval_err(LERR_BAD_NUM);
  }

  //The operator is always second child
  char* op = t->children[1]->contents;

  //Storing the third child
  lval third_child = eval(t->children[2]);

  //Iterate the remaining children and combining
  int i = 3;
  while(strstr(t->children[i]->tag, "expr"))
  {
    third_child = eval_op(third_child, op, eval(t->children[i]));
    i++;
  }

  return third_child;
}

lval eval_op(lval x, char* op, lval y)
{
  //If either value is an error, return it
  if(x.type == LVAL_ERR) {return x;}
  if(y.type == LVAL_ERR) {return y;}

  if(strcmp(op, "+") == 0) {return lval_num(x.num + y.num);}
  if(strcmp(op, "-") == 0) {return lval_num(x.num - y.num);}
  if(strcmp(op, "*") == 0) {return lval_num(x.num * y.num);}
  if(strcmp(op, "/") == 0)
  {
    //If second operand is zero, return error
    return y.num == 0
      ? lval_err(LERR_DIV_ZERO)
      : lval_num(x.num / y.num);
  }
  if(strcmp(op, "%") == 0) {return lval_num(x.num % y.num);}
  if(strcmp(op, "^") == 0) {return lval_num(pow(x.num, y.num));}
  if(strcmp(op, "min") == 0) {return lval_num(min(x.num, y.num));}
  if(strcmp(op, "max") == 0) {return lval_num(max(x.num, y.num));}

  return lval_err(LERR_BAD_OP);
}

void lval_print(lval v)
{
  switch(v.type)
  {
  case LVAL_NUM: printf("%li\n", v.num); break;
  case LVAL_ERR:
    //Check what type of error it is and print it
    if(v.err == LERR_DIV_ZERO) {printf("Error: Division by zero.");}
    if(v.err == LERR_BAD_OP)   {printf("Error: Invalid operator.");}
    if(v.err == LERR_BAD_NUM)  {printf("Error: Invalid number.");}
    break;
  }
}
